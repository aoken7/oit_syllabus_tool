import csv


def split(campus: str):
    number_list = list()

    with open(campus, "r", encoding="utf-8") as f:
        for line in f:
            text = line.strip().split(",")
            number_list.append(text[0])


def main():
    year = "2022"
    omiya = "./timetable/" + year + "/omiya.csv"
    # umeda = "./timetable/" + year + "/umeda.csv"
    # hirakata = "./timetable" + year + "/hirakata.csv"

    # for campus in [omiya,umeda,hirakata]:
    split(omiya)


if __name__ == '__main__':
    main()
