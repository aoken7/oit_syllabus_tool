import glob
import os
from pdfminer.high_level import extract_text
import re
import csv
from tqdm import tqdm

year = "2021"

# PDFファイル一覧を取得
file_list = ([os.path.basename(p) for p in glob.glob("./timetable/" + year + "/pdf/*.pdf", recursive=True)
              if os.path.isfile(p)])

for file in tqdm(file_list):
    # テキストの抽出
    text = extract_text("./timetable/" + year + "/pdf/" + file)

    # 末尾にA0を付加
    if file[0] == "X":
        text = re.sub(r"[a-zA-Z_0-9]{6}", r"\g<0>A0", text)

    # 英数字8桁のみを抽出
    re_text = re.findall(r'[a-zA-Z_0-9]{8}', text)

    with open("./timetable/" + year + "/csv/" + file[0] + ".csv", "w", encoding="utf_8") as f:
        writer = csv.writer(f, lineterminator='\n')
        writer.writerow(re_text)
