import os
from pathlib import Path
import cv2
from cv2 import threshold
import numpy as np
from pdf2image import convert_from_path
import glob
from tqdm import tqdm


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
        pages = convert_from_path(str(pdf_path), dpi=300)

    # 画像ファイルを１ページずつ保存
    image_dir = Path("./timetable/" + year + "/png")
    for i, page in enumerate(pages):
        file_name = f'{pdf_path.stem}_{i + 1}.png'
        image_path = f'{image_dir}/{file_name}'
        # PNGで保存
        page.save(str(image_path), "PNG")


def png2num(year: str):
    path = "/png/*.png"

    lower_pink = np.array([140, 30, 180])  # 下限のしきい値(HSV)
    upper_pink = np.array([180, 255, 255])  # 上限のしきい値(HSV)

    red = ["R", "S", "W", "Z"]
    lower_red = np.array([160, 50, 200])
    upper_red = np.array([180, 255, 255])

    red2 = ["I", "X"]
    lower_red2 = np.array([0, 70, 200])
    upper_red2 = np.array([40, 255, 255])

    png_list = get_file_list(year, path)
    for png in tqdm(png_list):
        img = cv2.imread("./timetable/" + year + "/png/" + png)  # 画像の読み込み
        img_hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)  # HSVに変換
        if png[0] in red:
            img_mask = cv2.inRange(img_hsv, lower_red, upper_red)  # マスク画像の生成
        elif png[0] in red2:
            img_mask = cv2.inRange(img_hsv, lower_red2, upper_red2)
        else:
            img_mask = cv2.inRange(img_hsv, lower_pink, upper_pink)
        img_extract = cv2.bitwise_and(
            img, img, mask=img_mask)  # マスク画像を適用して講義コードを抽出
        img_bgr = cv2.cvtColor(img_extract, cv2.COLOR_HSV2BGR)  # BGRに変換
        img_gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)  # グレースケールに変換
        th, img_threshold = threshold(
            img_gray, 10, 255, cv2.THRESH_BINARY)  # 二値化
        img_return = cv2.bitwise_not(img_threshold)  # 画像を反転
        cv2.imwrite("./timetable/" + year + "/num/" + png, img_return)  # 画像を保存


#  def num2csv():


def main():
    year = "2021"
#    pdf2png(year)  # PDFファイルをPNGに変換
    png2num(year)  # PNGファイルを講義コードを抜き出した画像に変換
#    num2csv(year) # 画像をOCRしてCSVに出力


if __name__ == "__main__":
    main()
