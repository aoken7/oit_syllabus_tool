from importlib.resources import path
import os
from pathlib import Path
import cv2
from cv2 import threshold
import numpy as np
from pdf2image import convert_from_path
import glob
from tqdm import tqdm
from PIL import Image
import pyocr
import pyocr.builders
import re
from pdfminer.high_level import extract_text
import csv


# ファイル一覧を取得
def get_file_list(year: str, path: str) -> list:
    file_list = os.listdir("./timetable/" + year + path)
    return file_list


def pdf2png(year: str):
    # poppler/binを環境変数PATHに追加する
    poppler_dir = Path(__file__).parent.absolute() / "./timetable/poppler/bin"
    os.environ["PATH"] += os.pathsep + str(poppler_dir)

    # PDFファイルのパスを取得し順番に捌いていく
    for x in tqdm(glob.glob("./timetable/" + year + "/pdf/*.pdf")):
        pdf_path = Path(x)

        # pdfから画像に変換
        pages = convert_from_path(str(pdf_path), dpi=600)

        # 画像ファイルを１ページずつ保存
        image_dir = Path("./timetable/" + year + "/png")
        for i, page in enumerate(pages):
            file_name = f"{pdf_path.stem}_{i + 1}.png"
            image_path = f"{image_dir}/{file_name}"

            # PNGで保存
            page.save(str(image_path), "PNG")


def png2num(year: str):
    path = "/png/*.png"

    # 下限と上限のしきい値(HSV)を設定
    lower_omiya = np.array([140, 30, 180])
    upper_omiya = np.array([180, 255, 255])

    umeda = ["R", "S", "W", "Z"]
    lower_umeda = np.array([160, 50, 200])
    upper_umeda = np.array([180, 255, 255])

    hirakata = ["I", "X"]
    lower_hirakata = np.array([0, 70, 200])
    upper_hirakata = np.array([255, 255, 255])

    png_list = get_file_list(year, path)
    for png in tqdm(png_list):

        # 画像の読み込み
        img = cv2.imread("./timetable/" + year + "/png/" + png)

        # HSVに変換
        img_hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

        # マスク画像の生成
        if png[0] in umeda:
            img_mask = cv2.inRange(img_hsv, lower_umeda, upper_umeda)
        elif png[0] in hirakata:
            img_mask = cv2.inRange(img_hsv, lower_hirakata, upper_hirakata)
        else:
            img_mask = cv2.inRange(img_hsv, lower_omiya, upper_omiya)

        # マスク画像を適用して講義コードを抽出
        img_extract = cv2.bitwise_and(
            img, img, mask=img_mask)

        # BGRに変換
        img_bgr = cv2.cvtColor(img_extract, cv2.COLOR_HSV2BGR)

        # グレースケールに変換
        img_gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)

        # 二値化
        th, img_threshold = threshold(
            img_gray, 10, 255, cv2.THRESH_BINARY)

        # 画像を反転
        img_return = cv2.bitwise_not(img_threshold)

        # 画像を保存
        cv2.imwrite("./timetable/" + year + "/num/" + png, img_return)


def num2csv(year: str):
    path = "/num/*.png"
    num_list = get_file_list(year, path)
    tools = pyocr.get_available_tools()
    tool = tools[0]

    for num in tqdm(num_list):

        # OCR
        txt = tool.image_to_string(
            Image.open("./timetable/" + year + "/num/" + num),
            lang="eng",
            builder=pyocr.builders.TextBuilder(tesseract_layout=6)
        )

        # 変換
        txt_convert = str.upper(txt).translate(str.maketrans(
            {" ": "_", "\n": "_", "O": "0", "I": "1", "l": "1",
             "À": "A", "Â": "A", "Ï": "I", "Î": "I", "Û": "U", "Ù": "U",
             "È": "E", "É": "E", "Ê": "E", "Ë": "E", "Ô": "O"}))

        # 記号削除後、アンダースコアをコンマに変換
        txt_del_symbol = (re.sub(r"\W", "", txt_convert)).replace("_", ",")

        # 末尾にA0を付加
        if num[0] == "X":
            txt_del_symbol = re.sub(
                r"[a-zA-Z_0-9]{6}", r"\g<0>A0", txt_del_symbol)

        # 英数字8文字のみ保存
        txt_normalized = re.findall(r"[a-zA-Z_0-9]{8}", txt_del_symbol)
        with open("./timetable/" + year + "/csv/" + num[:-4] + ".csv", "w", encoding="utf-8") as f:
            f.write(",".join(txt_normalized))


def pdf2csv(year: str):
    path = "/pdf/*.pdf"
    file_list = get_file_list(year, path)

    for file in tqdm(file_list):
        # テキストの抽出
        text = extract_text("./timetable/" + year + "/pdf/" + file)

        # 末尾にA0を付加
        if file[0] == "X":
            text = re.sub(r"[a-zA-Z_0-9]{6}", r"\g<0>A0", text)

        # 英数字8桁のみを抽出
        re_text = re.findall(r"[a-zA-Z_0-9]{8}", text)

    with open("./timetable/" + year + "/csv/" + file[0] + ".csv", "w", encoding="utf_8") as f:
        writer = csv.writer(f, lineterminator="\n")
        writer.writerow(re_text)


def main():
    year = "2022"
    pdf2png(year)  # PDFファイルをPNGに変換
    png2num(year)  # PNGファイルを講義コードを抜き出した画像に変換
    num2csv(year)  # 画像をOCRしてCSVに出力
    pdf2csv(year)  # PDFファイルをCSVに出力


if __name__ == "__main__":
    main()
