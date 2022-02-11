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


def get_file_list(year: str, path: str) -> list[str]:
    file_list = ([os.path.basename(p) for p in glob.glob("./timetable/" + year + path, recursive=True)
                  if os.path.isfile(p)])
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
        file_name = f'{pdf_path.stem}_{i + 1}.png'
        image_path = f'{image_dir}/{file_name}'
        # PNGで保存
        page.save(str(image_path), "PNG")


def png2num(year: str):
    path = "/png/*.png"

    # 下限のしきい値(HSV)と上限のしきい値(HSV)を設定
    lower_pink = np.array([140, 30, 180])
    upper_pink = np.array([180, 255, 255])

    red = ["R", "S", "W", "Z"]
    lower_red = np.array([160, 50, 200])
    upper_red = np.array([180, 255, 255])

    red2 = ["I", "X"]
    lower_red2 = np.array([0, 70, 200])
    upper_red2 = np.array([40, 255, 255])

    png_list = get_file_list(year, path)
    for png in tqdm(png_list):
        # 画像の読み込み
        img = cv2.imread("./timetable/" + year + "/png/" + png)
        # HSVに変換
        img_hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        # マスク画像の生成
        if png[0] in red:
            img_mask = cv2.inRange(img_hsv, lower_red, upper_red)
        elif png[0] in red2:
            img_mask = cv2.inRange(img_hsv, lower_red2, upper_red2)
        else:
            img_mask = cv2.inRange(img_hsv, lower_pink, upper_pink)
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
            Image.open('./timetable/' + year + '/num/' + num),
            lang="eng",
            builder=pyocr.builders.TextBuilder(tesseract_layout=6)
        )
        # 変換
        txt_convert = str.upper(txt).translate(str.maketrans(
            {" ": "_", "\n": "_", "O": "0", "I": "1", "l": "1"}))
        # 記号削除後、アンダースコアをコンマに変換
        txt_del_symbol = (re.sub(r"\W", "", txt_convert)).replace("_", ",")
        # 8文字or6文字のみ保存
        if num[0] == "X":
            txt_normalized = re.findall(r"\w{6}", txt_del_symbol)
        else:
            txt_normalized = re.findall(r"\w{8}", txt_del_symbol)
        with open("./timetable/" + year + "/csv/" + num[:-4] + ".csv", 'w', encoding="utf-8") as f:
            f.write(",".join(txt_normalized))


def main():
    year = "2021"
    pdf2png(year)  # PDFファイルをPNGに変換
    png2num(year)  # PNGファイルを講義コードを抜き出した画像に変換
    num2csv(year)  # 画像をOCRしてCSVに出力


if __name__ == "__main__":
    main()
