import os
from pathlib import Path
from pdf2image import convert_from_path
import glob
from tqdm import tqdm


def pdf2png(year: str):
    # poppler/binを環境変数PATHに追加する
    poppler_dir = Path(__file__).parent.absolute() / "./timetable/poppler/bin"
    os.environ["PATH"] += os.pathsep + str(poppler_dir)

    # PDFファイルのパスを取得し順番に捌いていく
    for x in tqdm(glob.glob("./timetable/" + year + "/pdf/*.pdf")):
        pdf_path = Path(x)

        # pdfから画像に変換
        pages = convert_from_path(str(pdf_path), dpi=200)

    # 画像ファイルを１ページずつ保存
    image_dir = Path("./timetable/" + year + "/png")
    for i, page in enumerate(pages):
        file_name = f'{pdf_path.stem}_{i + 1}.png'
        image_path = f'{image_dir}/{file_name}'
        # PNGで保存
        page.save(str(image_path), "PNG")


# def png2num(year: str):
#     pass

# def num2csv(year: str):
#     pass


def main():
    year = '2021'
    pdf2png(year)
#    png2num(year)
#    num2csv(year)


if __name__ == "__main__":
    main()
