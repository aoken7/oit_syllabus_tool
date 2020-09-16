from pdfminer.high_level import extract_text
import re
import csv

def export_list_csv(export_list, csv_dir):

    with open(csv_dir, "w") as f:
        writer = csv.writer(f, lineterminator='\n')

        if isinstance(export_list[0], list): #多次元の場合
            writer.writerows(export_list)

        else:
            writer.writerow(export_list)

s = str(extract_text('I-bu.pdf'))

l = []

t = list(s.split())
x = ''
for i in t:
    for j in i:
        alnumReg = re.compile(r'^[A-Z0-9]+$')
        if alnumReg.match(j)  :
            x += j

            if x[0] != '1' and x[0] != 'B' :
                x = ''

            flag = re.compile(r'^[A-F]')
            if len(x) > 1 and x[0] == '1' and not flag.match(x[1]):
                x = ''

            flag = re.compile(r'^[0-4ZTR]')
            if len(x) > 1 and x[0] == 'B' and not flag.match(x[1]):
                x = ''
            

            
            if len(x) > 2 and x[2] != 'A' and x[2] != 'B' and x[2] != 'C' and x[2] != 'D':
                x = ''
            
            if len(x) == 8:
                l.append(x)
                x = ''
        else :
            x = ''

print(l)
print(len(l))
export_list_csv(l, r"number.csv")