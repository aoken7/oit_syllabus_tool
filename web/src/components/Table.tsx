import MaterialTableCore from '@material-table/core';
import Button from '@material-ui/core/Button';
import React, { forwardRef } from 'react';
import data from '../data/2021.json';
import { useTheme } from '@material-ui/core/styles';

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const icons = {
    Filter: React.Fragment,
    Search: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <SearchIcon {...props} ref={ref} />),
    Close: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <CloseIcon {...props} ref={ref} />),
    ArrowUpward: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ArrowUpwardIcon {...props} ref={ref} />),
    ArrowDownward: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ArrowDownwardIcon {...props} ref={ref} />),
    ArrouwDropDown: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ArrowDropDownIcon {...props} ref={ref} />),
};

export const Table = () => {
    return (
        <div style={{
            whiteSpace: 'nowrap', //改行しないように
        }}>
            <MaterialTableCore
                columns={[
                    {
                        title: '講義名',
                        field: 'kougi',
                        align: "left",
                        defaultSort: 'asc'
                    },
                    {
                        title: '年次',
                        field: 'nenji',
                        align: "left",
                        defaultSort: 'asc',
                        type: 'numeric',
                        lookup: {
                            1: "1年次",
                            2: "2年次",
                            3: "3年次",
                            4: "4年次"
                        }
                    },
                    {
                        title: '期間',
                        field: 'kikan',
                        align: "left",
                        defaultSort: 'asc',
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
                    },
                    {
                        title: '担当者',
                        field: 'tantousya',
                        align: "left"
                    },
                    {
                        title: '単位',
                        field: 'tani',
                        align: "left",
                        type: 'numeric',
                        lookup: {
                            1: "1単位",
                            2: "2単位",
                            3: "3単位",
                            4: "4単位",
                            5: "5単位"
                        }
                    },
                    {
                        title: '学部/学科',
                        field: 'gakka',
                        align: "left",
                        lookup: {
                            I: "情報科学部",
                            Q: "工学部共通科目等",
                            C: "都市デザイン工学科",
                            A: "建築学科",
                            M: "機械工学科",
                            E: "電気電子システム工学科",
                            D: "電子情報システム工学科",
                            K: "応用化学科",
                            V: "環境工学科",
                            U: "生命工学科",
                            R: "ロボット工学科",
                            S: "システムデザイン工学科",
                            W: "空間デザイン学科",
                            P: "知的財産学部",
                            X: "大学院情報科学研究科",
                            Y: "大学院工学研究科",
                            Z: "大学院ロボティクス＆デザイン工学研究科",
                            T: "専門職大学院知的財産研究科",
                        }
                    },
                    {
                        title: '講義コード',
                        field: 'numbering',
                        align: "left"
                    },
                    {
                        title: 'リンク',
                        field: 'link',
                        render: row =>
                            <Button
                                variant="outlined"
                                size='small'
                                href={row.link}
                                color="inherit"
                                target="_blank"
                                rel="noopener noreferrer">
                                公式シラバス
                            </Button>,
                        filtering: false,
                        sorting: false
                    }
                ]}
                data={data} //インポートしたjsonファイルを表示
                title="Syllabus App"
                options={{
                    paging: false,
                    maxBodyHeight: "91vh",
                    headerStyle:
                    {
                        position: "sticky",
                        border: "none",
                        top: 0,
                        whiteSpace: 'nowrap',
                        zIndex: 1,
                    },
                    filterCellStyle:
                    {
                        position: "sticky",
                        top: "55.7px",
                        backgroundColor: useTheme().palette.background.paper,
                        zIndex: 1,
                    },
                    filtering: true,
                }}
                icons={icons}
                localization={{
                    body: {
                        emptyDataSourceMessage: '該当するシラバスはありません',
                    }
                }}
            />
        </div>
    );
}