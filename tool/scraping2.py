import datetime
import json
from time import sleep
import unicodedata
import pandas as pd
import requests
from requests.exceptions import Timeout
from requests.exceptions import ConnectionError
import re
import os
import glob
from tqdm import tqdm


# csvのファイル名一覧を取得
def get_files(path: str):
    csv_list = ([os.path.basename(p) for p in glob.glob(path + "*.csv", recursive=True)
                 if os.path.isfile(p)])
    csv_list.sort()
    return csv_list


# 入力ファイルは一行で','区切りの文字列を想定
def get_number(filepath: str):
    with open(filepath, 'r') as fp:
        numbers = fp.readline().strip().split(',')  # strip()は改行コード除去用
    numbers = list(set(numbers))  # 重複削除
    numbers.sort()
    return numbers


# スクレイピングし、dataframeをリストに変換
def scraping(year: str, number: str):
    df_list = list()
    url = "https://www.portal.oit.ac.jp/CAMJWEB/slbssbdr.do?value(risyunen)=" + \
        year + "&value(semekikn)=1&value(kougicd)=" + \
        number + "&value(crclumcd)=10201200"

    try:
        dfs = pd.read_html(requests.get(url, timeout=9.0).text)
    except (Timeout, ConnectionError):
        print("\nError numbering:" + number)
        sleep(3)
        dfs = pd.read_html(requests.get(url, timeout=9.0).text)

    print(len(dfs))

    for i in range(1, len(dfs)):
        if i == 1:
            df = (dfs[i]).dropna(how='all').dropna(
                how='all', axis=1).drop(dfs[1].columns[0], axis=1).drop(dfs[1].index[4])
        else:
            df = (dfs[i]).dropna(how='all').dropna(how='all', axis=1)
        df_text = ((df.to_csv(index=False, header=False, encoding='utf-8')
                    ).replace('\u3000', ''))
        df_line = df_text.splitlines()
        df_list.append(df_line)

    return df_list, url


def convert(df_list: list, number: str, csv: str, url: str):
    value_list = [None] * 63
    jyugyo_list = list()
    hosei = 0
    text = "\n".join(df_list[1])
    key_list = ["kougi", "kougieng", "nenji", "tani", "kikan", "tantousya", "numbering",
                "gakka", "link", "nerai", "cs", "spiral", "theme1", "theme2",
                "theme3", "theme4", "theme5", "theme6", "theme7", "theme8", "theme9",
                "theme10", "theme11", "theme12", "theme13", "theme14", "naiyou1",
                "naiyou2", "naiyou3", "naiyou4", "naiyou5", "naiyou6", "naiyou7",
                "naiyou8", "naiyou9", "naiyou10", "naiyou11", "naiyou12", "naiyou13",
                "naiyou14", "yosyu1", "yosyu2", "yosyu3", "yosyu4", "yosyu5", "yosyu6",
                "yosyu7", "yosyu8", "yosyu9", "yosyu10", "yosyu11", "yosyu12", "yosyu13",
                "yosyu14", "mokuhyou", "hyoukahouhou", "hyoukakijyun", "kyoukasyo",
                "sankousyo", "kokoroe", "officehours", "jissen"]

    # 講義名等
    for i in range(len(df_list[0])):
        value_list[i] = df_list[0][i]
    value_list[2] = str(value_list[2]).replace("年次", "")  # 年次を削除
    value_list[5] = re.sub("\(.+?\)", "", value_list[5])  # 担当者名のよみがな削除
    value_list[6] = number  # 講義コード追加
    value_list[7] = csv[0]  # 学科名追加
    value_list[8] = url  # URL追加

    # 授業のねらい・概要
    value_list[9] = df_list[2][0]

    # CSコース
    if "CSコース" in text:
        spiral = re.search(r"CSコース,(.*)", text).group(1)
        if len(spiral) > 0:
            value_list[10] = spiral
            hosei += 1  # 参照のズレを補正

    # スパイラル型教育
    if "スパイラル型教育" in text:
        spiral = re.search(r"スパイラル型教育,(.*)", text).group(1)
        if len(spiral) > 0:
            value_list[11] = spiral
            hosei += 1

    # 授業計画
    for i in range(1, (len(df_list[3+hosei]))):
        jyugyo_list.append(str(df_list[3+hosei][i]).split(","))  # ","で分割
        for j in range(len(jyugyo_list)):
            # テーマ
            value_list[12+j] = jyugyo_list[j][1]
            # 内容・方法等
            value_list[26+j] = jyugyo_list[j][2]
            # 予習/復習
            value_list[40+j] = jyugyo_list[j][3]

    # 目標、評価方法、評価基準
    for i in range(3):
        value_list[54+i] = df_list[(4+i)+hosei][0]

    # 教科書
    if "教科書" in text:
        kyoukasyo = re.search(r"教科書,(.*)", text).group(1)
        if len(kyoukasyo) > 0:
            value_list[57] = kyoukasyo
            hosei += 1  # 参照のズレを補正

    # 参考書
    if "参考書" in text:
        sankousyo = re.search(r"参考書,(.*)", text).group(1)
        if len(sankousyo) > 0:
            value_list[58] = sankousyo
            hosei += 1

    # for i in range(1, len(df_list[7+list_num])):
    #     book_list = str(df_list[7+list_num][i]).split(",")
    #     for j in range(1, len(book_list)):
    #         book = ",".join(book_list[j])
    #         value_list[58] += book

    # 受講心得
    value_list[59] = df_list[7+hosei][0]

    # オフィスアワー
    value_list[60] = df_list[8+hosei][0]

    # 実践的教育
    if len(df_list[9+hosei]) > 0:
        value_list[61] = df_list[9+hosei][0]

    # 値がnullを記載なしにする
    for i in range(len(value_list)):
        if value_list[i] == None:
            value_list[i] = "記載なし"

    # 正規化
    for i in range(len(value_list)):
        value_list[i] = unicodedata.normalize("NFKC", str(value_list[i]))

    df_dict = dict(zip(key_list, value_list))

    return df_dict


def duplicate_check(check_df_dict: list, number: str, df_dict_list: list):
    for i in range(len(df_dict_list)):
        df_dict = df_dict_list[i]
        if df_dict["kougi"] == check_df_dict["kougi"] and \
                df_dict["nenji"] == check_df_dict["nenji"] and \
                df_dict["kikan"] == check_df_dict["kikan"] and \
                df_dict["tantousya"] == check_df_dict["tantousya"] and \
                df_dict["tani"] == check_df_dict["tani"]:
            df_dict_list[i]["numbering"] += " , " + number
        return df_dict_list, None
    return df_dict_list, df_dict


def rewrite_readme(error: int):
    date = datetime.datetime.now(datetime.timezone(
        datetime.timedelta(hours=+9))).strftime("%Y/%m/%d")
    with open("../README.md", 'r', encoding="utf-8") as fp:
        s = re.sub("\d{4}/\d{2}/\d{2}", date, fp.read())  # 更新日の書き換え
        s = re.sub("<!-- エラー数=\d{1,4} -->",
                   "<!-- エラー数=" + str(error) + " -->", s)  # エラー数の書き換え
    with open("../README.md", 'w', encoding="utf-8") as fp:
        fp.write(s)


def main():
    year = "2022"
    error = 0
    df_dict_list = list()
    path = "./timetable/" + year + "/csv/"

    csv_list = get_files(path)
    for csv in tqdm(csv_list, desc="全体の進捗率"):
        numbers = get_number(path + csv)
        for number in tqdm(numbers, desc=csv):
            print(number)
            df_list, url = scraping(year, number)
            if len(df_list) < 6:
                error += 1
                continue
            df_dict = convert(df_list, number, csv, url)  # 辞書に変換
            # if len(df_dict_list) > 0:
            # df_dict_list, df_dict = duplicate_check(
            #     df_dict, number, df_dict_list)
            df_dict_list.append(df_dict)  # 辞書をリストに追加

        # jsonとして保存
        with open("./" + year + ".json", 'w', encoding='utf-8') as fp:
            json.dump(df_dict_list, fp, ensure_ascii=False, indent=4)

    rewrite_readme(error)  # READMEを書き換える


if __name__ == "__main__":
    main()
