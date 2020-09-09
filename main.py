import urllib.request
import csv
import requests
import pandas as pd
from bs4 import BeautifulSoup

def export_list_csv(export_list, csv_dir):

    with open(csv_dir, "w") as f:
        writer = csv.writer(f, lineterminator='\n')

        if isinstance(export_list[0], list): #多次元の場合
            writer.writerows(export_list)

        else:
            writer.writerow(export_list)

csv_file = open("number.csv", "r", encoding="UTF-8", errors="", newline="" )
number_data = csv.reader(csv_file)

ans = []

for i in number_data:
    for j in i:
        number = str(j)
        print(number)
        
        url = "https://www.portal.oit.ac.jp/CAMJWEB/slbssbdr.do?value(risyunen)=2020&value(semekikn)=1&value(kougicd)=" + number + "&value(crclumcd)=10201200"

        #req = urllib.request.Request(url)
        #html = requests.get(url).text
        path = "./html/"  + number + ".html" 
        localhtml = open(path, "r", encoding="UTF-8", errors="", newline="" )
        #soup=BeautifulSoup(html,"html.parser")
        soup=BeautifulSoup(localhtml,"html.parser")

        elmes = soup.select('.kougi')

        keystring = ""

        for elem in elmes:
            #print(elem.get_text())    
            #text = script.get_text()
            keystring += elem.get_text()
        
        lines= [line.strip() for line in keystring.splitlines()]

        text=",".join(line for line in lines if line)

        text = text.split(',')

        if len(text) < 7:
            continue

        csvtext = []
        csvtext.append(text[0])
        csvtext.append(text[3])
        csvtext.append(text[5])
        csvtext.append(text[6].replace('\u3000', ''))
        csvtext.append(str(number))


        #print(csvtext)

        export_list_csv(csvtext, r"./outcsv/" + number + ".csv")