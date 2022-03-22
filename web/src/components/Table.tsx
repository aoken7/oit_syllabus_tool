import MaterialTableCore from "@material-table/core";
import { Button, Select, MenuItem, FormControl } from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { forwardRef } from "react";
import data2021 from "../data/2021mini.json";
import data2022 from "../data/2022mini.json";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// アイコンの置き換え
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const icons = {
    Filter: React.Fragment,
    Search: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <SearchIcon {...props} ref={ref} />),
    Close: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <CloseIcon {...props} ref={ref} />),
    ArrowUpward: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ArrowUpwardIcon {...props} ref={ref} />),
    ArrowDownward: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ArrowDownwardIcon {...props} ref={ref} />),
    ArrouwDropDown: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ArrowDropDownIcon {...props} ref={ref} />),
};

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 60,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export const Table = (props: any) => {
    let data = data2022;
    if (props.year === "2021") {
        data = data2021;
    } else {
        data = data2022;
    }

    const classes = useStyles();

    const [year, setYear] = React.useState("2022");

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setYear(event.target.value as string);
    };

    return (
        <MaterialTableCore
            columns={[
                {
                    title: "講義名",
                    field: "kougi",
                    align: "left",
                    defaultSort: "asc"
                },
                {
                    title: "年次",
                    field: "nenji",
                    align: "left",
                    defaultSort: "asc",
                    type: "numeric",
                    lookup: {
                        1: "1年次",
                        2: "2年次",
                        3: "3年次",
                        4: "4年次"
                    }
                },
                {
                    title: "期間",
                    field: "kikan",
                    align: "left",
                    defaultSort: "asc",
                    /*
                    lookup: {
                        前期: "前期",
                        後期: "後期",
                        前期前半: "前期前半",
                        前期後半: "前期後半",
                        後期前半: "後期前半",
                        後期後半: "後期後半",
                        前期集中: "前期集中",
                        後期集中: "後期集中",
                        集中: "集中"
                    }
                    */
                },
                {
                    title: "単位",
                    field: "tani",
                    align: "left",
                    type: "numeric",
                    lookup: {
                        0: "0単位",
                        1: "1単位",
                        2: "2単位",
                        3: "3単位",
                        4: "4単位",
                        5: "5単位",
                        6: "6単位",
                        12: "12単位",
                    }
                },
                {
                    title: "担当者",
                    field: "tantousya",
                    align: "left"
                },
                {
                    title: "学部/学科",
                    field: "gakka",
                    align: "left",
                    lookup: {
                        I: "情報科学部",
                        //F: "情報知能学科",
                        //B: "情報システム学科",
                        //H: "情報メディア学科",
                        //N: "ネットワークデザイン学科",
                        //J: "データサイエンス学科",
                        Q: "工学部",
                        C: "都市デザイン工学科",
                        A: "建築学科",
                        M: "機械工学科",
                        E: "電気電子システム工学科",
                        D: "電子情報システム工学科",
                        K: "応用化学科",
                        V: "環境工学科",
                        U: "生命工学科",
                        //L: "R&D工学部",
                        R: "ロボット工学科",
                        S: "システムデザイン工学科",
                        W: "空間デザイン学科",
                        P: "知的財産学部",
                        //G: "教職課程",
                        X: "大学院情報科学研究科",
                        Y: "大学院工学研究科",
                        Z: "大学院R&D工学研究科",
                        T: "大学院知的財産研究科",
                        a: "AC専攻",
                        e: "EDM専攻",
                        k: "KVU専攻",
                    }
                },
                {
                    title: "リンク",
                    field: "link",
                    render: (row: { link: string; }) =>
                        <Button
                            variant="outlined"
                            size="small"
                            href={row.link}
                            color="inherit"
                            target="_blank"
                            rel="noopener noreferrer">
                            公式シラバス
                        </Button>,
                    filtering: false,
                    sorting: false,
                    headerStyle: {
                        minWidth: "135px",
                    },
                },
                {
                    title: "講義コード",
                    field: "numbering",
                    align: "left"
                },
            ]}
            data={data} //インポートしたjsonファイルを表示
            title={
                <FormControl className={classes.formControl}>
                    <Select
                        id="year"
                        value={year}
                        onChange={handleChange}
                    >
                        <MenuItem value={2021}>
                            <Link
                                to="/2021"
                                style={{
                                    textDecoration: "none",
                                    color: "inherit"
                                }}
                            >
                                2021
                            </Link>
                        </MenuItem>
                        <MenuItem value={2022}>
                            <Link
                                to="/2022"
                                style={{
                                    textDecoration: "none",
                                    color: "inherit"
                                }}
                            >
                                2022
                            </Link>
                        </MenuItem>
                    </Select>
                </FormControl>
            }
            options={{
                paging: true,
                pageSize: 100,
                pageSizeOptions: [30, 50, 100, 300],
                emptyRowsWhenPaging: false,
                maxBodyHeight: "85vh",
                headerStyle:
                {
                    backgroundColor: useTheme().palette.background.paper,
                    position: "sticky",
                    border: "none",
                    top: 0,
                    whiteSpace: "nowrap",
                    zIndex: 1,
                },
                filterCellStyle:
                {
                    backgroundColor: useTheme().palette.background.paper,
                    position: "sticky",
                    top: "55.7px",
                    zIndex: 1,
                },
                filtering: true,
            }}
            icons={icons}
            localization={{
                body: {
                    emptyDataSourceMessage: "該当するシラバスはありません",
                }
            }}
        />
    );
}