import re


# 1行にするときに使用する
def oneline(file):
    with open(file, "r", encoding="utf-8") as f:
        text = f.read().replace("\n", ",")
        with open(file, "w", encoding="utf-8") as f:
            f.write(text)


# 学部/学科の名称を変更する
def rename(file, path):
    for element in file:
        if (element[2] == "P院"):
            element[2] = "T"
        elif (element[2] == "T院"):
            element[2] = "Y"
        elif (element[2] == "AC専攻"):
            element[2] = "a"
        elif (element[2] == "EDM専攻"):
            element[2] = "e"
        elif (element[2] == "KVU専攻"):
            element[2] = "k"
        elif (element[2] == "T部（共通）"):
            element[2] = "Q"
        else:
            element[2] = re.match(r'\w', element[2]).group()
    with open(path, "w", encoding="utf-8") as f:
        for element in file:
            f.write(",".join(element))
            f.write("\n")


# インポートされたcsvをリストに変換する
def convert_list(file):
    element_list = list()
    with open(file, "r", encoding="utf-8") as f:
        for line in f:
            element = line.strip().split(",")
            element_list.append(element)
    return element_list


# 学部/学科ごとにcsvを抽出する
def extract(year: str, element_list: list):
    num_list = list()

    for i in range(len(element_list)-1):
        num_list.append((element_list[i])[0])
        if ((element_list[i])[2] != (element_list[i+1])[2]):
            with open("./timetable/" + year + "/csv/" + (str(element_list[i][2])) + "-official.csv", "w", encoding="utf-8") as f:
                f.write(",".join(num_list))
            num_list.clear()
    with open("./timetable/" + year + "/csv/" + (str(element_list[i][2])) + "-official.csv", "w", encoding="utf-8") as f:
        f.write(",".join(num_list))


def main():
    year = "2022"
    omiya = "./timetable/" + year + "/omiya.csv"
    # umeda = "./timetable/" + year + "/umeda.csv"
    # hirakata = "./timetable" + year + "/hirakata.csv"

    # for campus in [omiya,umeda,hirakata]:
    element_list = convert_list(omiya)
    # rename(element_list, campus)
    extract(year, element_list)


if __name__ == '__main__':
    main()
