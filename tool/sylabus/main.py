import argparse
import json
import requests
import unicodedata
import re

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


def scraping_syllabus(number: str) -> Dict[str, str]:
    url = "https://www.portal.oit.ac.jp/CAMJWEB/slbssbdr.do?value(risyunen)=2021&value(semekikn)=1&value(kougicd)=" + \
        number + "&value(crclumcd)=10201200"

    html = requests.get(url).text
    syllabus_dict = extract_element(html)
    syllabus_dict['link'] = url
    syllabus_dict['numbering'] = number

    return syllabus_dict


def main(input: str, output: str) -> None:
    numbers = import_syllabus_number(input)
    numbers = list(set(numbers))  # 重複削除
    syllabus_dict_list = list()

    for number in tqdm(numbers):
        syllabus_dict = scraping_syllabus(number)
        # ページがない時のエラー処理，もう少し上手くやりたい
        if len(syllabus_dict) < 3:
            continue
        syllabus_dict_list.append(syllabus_dict)
    with open(output, 'w', encoding='utf-8') as fp:
        json.dump(syllabus_dict_list, fp, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', type=str, required=True, help="")
    parser.add_argument('--output', type=str, required=True, help="")
    args = parser.parse_args()
    main(**vars(parser.parse_args()))
