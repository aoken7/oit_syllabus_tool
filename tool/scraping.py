import argparse
import json
import requests
import unicodedata
import re
import glob
import os
import datetime

from bs4 import BeautifulSoup
from email import parser
from tqdm import tqdm
from typing import List, Dict


# 入力ファイルは一行で','区切りの文字列を想定
def import_syllabus_number(filepath: str) -> List[str]:
    with open(filepath, 'r') as fp:
        numbers = fp.readline().strip().split(',')  # strip()は改行コード除去用
    return numbers


def extract_element(html: str) -> Dict[str, str]:
    soup = BeautifulSoup(html, "html.parser")
    elmes = soup.select('.kougi')

    element_buff = ""
    for elem in elmes:
        element_buff += elem.get_text()

    lines = [line.strip() for line in element_buff.splitlines()]
    text = ",".join(line for line in lines if line).split(',')

    # ページがない時のエラー処理
    try:
        syllabus_dict = dict(
            kougi=re.sub(
                "\【.+?\】", "", unicodedata.normalize("NFKD", text[0])),
            nenji=unicodedata.normalize("NFKD", (text[3].replace('年次', ''))),
            tani=unicodedata.normalize("NFKD", text[4]),
            kikan=re.sub("[()]", "", unicodedata.normalize("NFKD", text[5])),
            tantousya=re.sub(
                "\(.+?\)", "", unicodedata.normalize("NFKD", text[6])),
        )
    except:
        syllabus_dict = dict()
    return syllabus_dict


def scraping_syllabus(number: str, year: str, csv: str) -> Dict[str, str]:
    url = "https://www.portal.oit.ac.jp/CAMJWEB/slbssbdr.do?value(risyunen)=" + year + "&value(semekikn)=1&value(kougicd)=" + \
        number + "&value(crclumcd)=10201200"

    html = requests.get(url, timeout=9.0).text
    syllabus_dict = extract_element(html)
    syllabus_dict['link'] = url
    syllabus_dict['numbering'] = number
    syllabus_dict['gakka'] = csv[0]

    return syllabus_dict


def main():
    year = "2022"  # スクレイピングする年度を指定
    error = 0
    csv_list = ([os.path.basename(p) for p in glob.glob("./timetable/" + year + "/csv/*.csv", recursive=True)
                if os.path.isfile(p)])  # csvファイルを全て取得
    csv_list.sort()
    syllabus_dict_list = list()
    duplicate_check = list()
    for csv in tqdm(csv_list, desc="全体の進捗率"):
        numbers = import_syllabus_number("./timetable/" + year + "/csv/" + csv)
        numbers = list(set(numbers) - set(duplicate_check))  # 重複削除
        duplicate_check.extend(numbers)
        numbers.sort()
        duplicate_check.sort()
        for number in tqdm(numbers, desc=csv):
            syllabus_dict = scraping_syllabus(number, year, csv)
            # ページがない時のエラー処理，もう少し上手くやりたい
            if len(syllabus_dict) < 5:
                error += 1  # エラー数をカウント
                continue
            syllabus_dict_list.append(syllabus_dict)  # リストに追加
    with open("../web/src/data/" + year + ".json", 'w', encoding='utf-8') as fp:
        json.dump(syllabus_dict_list, fp, ensure_ascii=False, indent=4)
    with open("./timetable/" + year + "/numbers.csv", 'w', encoding='utf-8') as fp:
        fp.write(",".join(duplicate_check))

    # READMEの書き換え
    date = datetime.datetime.now(datetime.timezone(
        datetime.timedelta(hours=+9))).strftime("%Y/%m/%d")
    with open("../README.md", 'r', encoding="utf-8") as fp:
        s = re.sub("\d{4}/\d{2}/\d{2}", date, fp.read())  # 更新日の書き換え
        s = re.sub("<!-- エラー数=\d{1,4} -->",
                   "<!-- エラー数=" + str(error) + " -->", s)  # エラー数の書き換え
    with open("../README.md", 'w', encoding="utf-8") as fp:
        fp.write(s)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    # parser.add_argument('--input', type=str, required=True, help="") # 入力ファイル名
    # parser.add_argument('--output', type=str, required=True, help="") # 出力ファイル名
    args = parser.parse_args()
    main(**vars(parser.parse_args()))
