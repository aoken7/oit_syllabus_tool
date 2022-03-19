import argparse
import json
from time import sleep
import requests
from requests.exceptions import Timeout
from requests.exceptions import ConnectionError
import unicodedata
import re
import glob
import os
import datetime

from bs4 import BeautifulSoup
from email import parser
from tqdm import tqdm
from typing import List, Dict


class SyllabusTool:
    def __init__(self) -> None:
        self.year = "2022"  # スクレイピングする年度を指定
        self.syllabus_dict_list = list()
        self.error = 0
        self.csv_list = [os.path.basename(p) for p in glob.glob("./timetable/" + self.year + "/csv/*.csv", recursive=True)
                    if os.path.isfile(p)]  # csvファイルを全て取得
        self.csv_list.sort()

    # 入力ファイルは一行で','区切りの文字列を想定
    def import_syllabus_number(self, filepath: str) -> List[str]:
        with open(filepath, 'r') as fp:
            numbers = fp.readline().strip().split(',')  # strip()は改行コード除去用
        return numbers

    def extract_element(self, html: str) -> Dict[str, str]:
        soup = BeautifulSoup(html, "html.parser")
        elmes = soup.select('.kougi')

        element_buff = ""
        for elem in elmes:
            element_buff += elem.get_text()

        lines = [line.strip() for line in element_buff.splitlines()]
        text = ",".join(line for line in lines if line).split(',')

        try:
            syllabus_dict = dict(
                kougi=re.sub(
                    "\【.+?\】", "", unicodedata.normalize("NFKD", text[0])),
                nenji=unicodedata.normalize(
                    "NFKD", (text[3].replace('年次', ''))),
                tani=unicodedata.normalize("NFKD", text[4]),
                kikan=unicodedata.normalize("NFKD", text[5]),
                tantousya=re.sub(
                    "\(.+?\)", "", unicodedata.normalize("NFKD", text[6])),
            )
        except:
            syllabus_dict = dict()
        return syllabus_dict

    def scraping_syllabus(self, number: str, year: str, csv: str):
        url = "https://www.portal.oit.ac.jp/CAMJWEB/slbssbdr.do?value(risyunen)=" + year + "&value(semekikn)=1&value(kougicd)=" + \
            number + "&value(crclumcd)=10201200"

        try:
            html = requests.get(url, timeout=9.0).text
        except (Timeout, ConnectionError):
            print("\nTimeout numbering:" + number)
            sleep(3)
            html = requests.get(url, timeout=9.0).text
            # ここでもエラーになると詰むので改修する必要あり

        syllabus_dict = self.extract_element(html)
        key_list = (list(syllabus_dict.keys()))
        if key_list != [] and self.duplicate_check(syllabus_dict, number):
            syllabus_dict["link"] = url
            syllabus_dict["numbering"] = number
            syllabus_dict["gakka"] = csv[0]
            self.syllabus_dict_list.append(syllabus_dict) # リストに追加
        else:
            # ページがない時のエラー処理，もう少し上手くやりたい
            self.error += 1  # エラー数をカウント

    def duplicate_check(self, check_syllabus_dict: list, number: str):
        for i in range(len(self.syllabus_dict_list)):
            syllabus_dict = self.syllabus_dict_list[i]
            if syllabus_dict["kougi"] == check_syllabus_dict["kougi"] and \
               syllabus_dict["nenji"] == check_syllabus_dict["nenji"] and \
               syllabus_dict["kikan"] == check_syllabus_dict["kikan"] and \
               syllabus_dict["tantousya"] == check_syllabus_dict["tantousya"] and \
               syllabus_dict["tani"] == check_syllabus_dict["tani"]:
                self.syllabus_dict_list[i]["numbering"] += " , " + number
                return False
        return True

    def make_syllabus_dict_list(self):
        duplicate_check = list()
        for csv in tqdm(self.csv_list, desc="全体の進捗率"):
            numbers = self.import_syllabus_number(
                "./timetable/" + self.year + "/csv/" + csv)
            numbers = list(set(numbers) - set(duplicate_check))  # 重複削除
            duplicate_check.extend(numbers)
            numbers.sort()
            duplicate_check.sort()
            for number in tqdm(numbers, desc=csv):
                self.scraping_syllabus(number, self.year, csv)
        return duplicate_check

    def main(self, *args):
        duplicate_check = self.make_syllabus_dict_list()
        with open("../web/src/data/" + self.year + ".json", 'w', encoding='utf-8') as fp:
            json.dump(self.syllabus_dict_list, fp, ensure_ascii=False, indent=4)
        with open("./timetable/" + self.year + "/numbers.csv", 'w', encoding='utf-8') as fp:
            fp.write(",".join(duplicate_check))

        # READMEの書き換え
        date = datetime.datetime.now(datetime.timezone(
            datetime.timedelta(hours=+9))).strftime("%Y/%m/%d")
        with open("../README.md", 'r', encoding="utf-8") as fp:
            s = re.sub("\d{4}/\d{2}/\d{2}", date, fp.read())  # 更新日の書き換え
            s = re.sub("<!-- エラー数=\d{1,4} -->",
                       "<!-- エラー数=" + str(self.error) + " -->", s)  # エラー数の書き換え
        with open("../README.md", 'w', encoding="utf-8") as fp:
            fp.write(s)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    # parser.add_argument('--input', type=str, required=True, help="") # 入力ファイル名
    # parser.add_argument('--output', type=str, required=True, help="") # 出力ファイル名
    args = parser.parse_args()
    SyllabusTool().main(**vars(parser.parse_args()))
