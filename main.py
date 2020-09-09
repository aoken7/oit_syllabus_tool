import urllib.request
import csv
import requests
import pandas as pd
from bs4 import BeautifulSoup

csv_file = open("number.csv", "r", encoding="UTF-8", errors="", newline="" )
number_data = csv.reader(csv_file)


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

        for script in soup(["script", "style"]):
            script.decompose()

        text = soup.get_text()

        lines= [line.strip() for line in text.splitlines()]

        #print(lines)
        text=",".join(line for line in lines if line)
        print(text)

        #with urllib.request.urlopen(req) as res:
            #body = res.read()

        #print(body)
        with open(r'outhtml/'+str(number)+'.html','w') as file:
            #file.write(body.decode())
            file.write(text)