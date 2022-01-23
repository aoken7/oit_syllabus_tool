import os
from pathlib import Path
from pdf2image import convert_from_path
import glob

# poppler/binを環境変数PATHに追加する
poppler_dir = Path(__file__).parent.absolute() / "poppler/bin"
os.environ["PATH"] += os.pathsep + str(poppler_dir)

# PDFファイルのパスを取得し順番に捌いていく
for x in glob.glob("./2021/pdf/*.pdf"):
    pdf_path = Path(x)

    # pdfから画像に変換
    pages = convert_from_path(str(pdf_path), dpi=200)

    # 画像ファイルを１ページずつ保存
    image_dir = Path("./2021/png")
    for i, page in enumerate(pages):
        file_name = f'{pdf_path.stem}_{i + 1}.png'
        image_path = f'{image_dir}/{file_name}'
        # PNGで保存
        page.save(str(image_path), "PNG")
