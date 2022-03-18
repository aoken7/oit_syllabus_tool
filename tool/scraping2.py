from time import sleep
from typing import List
import pandas as pd
import requests
from requests.exceptions import Timeout
from requests.exceptions import ConnectionError
import re
import os
import glob
from tqdm import tqdm


def get_csv_list(path: str) -> List[str]:
    csv_list = ([os.path.basename(p) for p in glob.glob(path + "*.csv", recursive=True)
                 if os.path.isfile(p)])
    return csv_list


# 入力ファイルは一行で','区切りの文字列を想定
def import_syllabus_number(filepath: str) -> List[str]:
    with open(filepath, 'r') as fp:
        numbers = fp.readline().strip().split(',')  # strip()は改行コード除去用
    return numbers


def scraping(year: str, number: str) -> List[str]:
    df_list = list()
    url = "https://www.portal.oit.ac.jp/CAMJWEB/slbssbdr.do?value(risyunen)=" + \
        year+"&value(semekikn)=1&value(kougicd)=" + \
        number + "&value(crclumcd)=10201200"

    try:
        dfs = pd.read_html(requests.get(url, timeout=9.0).text)
    except (Timeout, ConnectionError):
        print("\nTimeout numbering:" + number)
        sleep(3)
        dfs = pd.read_html(requests.get(url, timeout=9.0).text)

    for i in range(1, len(dfs)):
        df = (dfs[i]).dropna(how='all').dropna(how='all', axis=1)
        df_text = ((df.to_csv(index=False, header=False, encoding='utf-8')
                    ).replace('\u3000', ''))
        df_line = df_text.splitlines()
        df_list.append(df_line)

    # for j in range(len(df_list)):
    #     with open("data" + str(j+1) + '.txt', 'w', encoding="utf-8") as f:
    #         f.write(df_list[j])

    return df_list


def df_convert(df_list: list):
    value_list = list()
    key_list = ["kougi", "kikan", "nenji", "tani", "tantousya", "numbering",
                "gakka", "link", "nerai", "cs", "spiral", "theme1", "theme2",
                "theme3", "theme4", "theme5", "theme6", "theme7", "theme8",
                "theme9", "theme10", "theme11", "theme12", "theme13", "theme14",
                "naiyou1", "naiyou2", "naiyou3", "naiyou4", "naiyou5", "naiyou6",
                "naiyou7", "naiyou8", "naiyou9", "naiyou10", "naiyou11", "naiyou12",
                "naiyou13", "naiyou14", "yosyu1", "yosyu2", "yosyu3", "yosyu4",
                "yosyu5", "yosyu6", "yosyu7", "yosyu8", "yosyu9", "yosyu10", "yosyu11",
                "yosyu12", "yosyu13", "yosyu14", "mokuhyou", "hyoukahouhou", "hyoukakijyun",
                "kyoukasyo", "sankousyo", "kokoroe", "officehour", "jissen"]


def convert_json(df_dict_list):
    pass


def rewrite_readme():
    pass


def main():
    year = "2022"
    df_dict_list = list()
    path = "./timetable/" + year + "/csv/"

    csv_list = get_csv_list(path)
    for csv in tqdm(csv_list, desc="全体の進捗率"):
        numbers = import_syllabus_number(path + csv)
        for number in tqdm(numbers):
            df_list = scraping(year, number)
            df_dict = df_convert(df_list)
            df_dict_list.append(df_dict)
        convert_json(df_dict_list)
    rewrite_readme()


if __name__ == "__main__":
    main()
