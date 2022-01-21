import MaterialTableCore from '@material-table/core';
import React, { useEffect, useState } from 'react';

export const List = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        fetch("https://gist.githubusercontent.com/yashikota/1acd6ebfdcb9008af898ef9cb38f6782/raw/4016b1d6654b1a4b04e0422f410ac46b49e04ea6/oit")
            .then(resp => resp.json())
            .then(resp => {
                setData(resp)
            })
    }, [])

    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTableCore
                columns={[
                    {
                        title: '講義名',
                        field: 'kougi',
                        align: "left",
                        defaultSort: 'asc',
                        headerStyle: {
                            minWidth: 210,
                        },
                    },
                    {
                        title: '年次',
                        field: 'nenji',
                        align: "left",
                        type: 'numeric',
                        lookup: { 1: "1年次", 2: "2年次", 3: "3年次", 4: "4年次" }
                    },
                    {
                        title: '期間',
                        field: 'kikan',
                        align: "left"
                    },
                    {
                        title: '単位',
                        field: 'tani',
                        align: "left",
                        type: 'numeric',
                        lookup: { 1: "1単位", 2: "2単位", 3: "3単位", 4: "4単位" }
                    },
                    {
                        title: '担当者',
                        field: 'tantousya',
                        align: "left",
                        headerStyle: {
                            minWidth: 190,
                        }
                    },
                    {
                        title: '学部/学科',
                        field: 'gakka',
                        align: "left",
                        lookup: {
                            情報科学部: "情報科学部",
                            工学部: "工学部",
                            都市デザイン工学科: "都市デザイン工学科",
                            建築学科: "建築学科",
                            機械工学科: "機械工学科",
                            電気電子システム工学科: "電気電子システム工学科",
                            電子情報システム工学科: "電子情報システム工学科",
                            応用化学科: "応用化学科",
                            環境工学科: "環境工学科",
                            生命工学科: "生命工学科",
                            ロボティクスデザイン工学部: "ロボティクスデザイン工学部",
                            ロボット工学部: "ロボット工学科",
                            ステムデザイン工学科: "システムデザイン工学科",
                            空間デザイン学科: "空間デザイン学科",
                            知的財産学部: "知的財産学部"
                        }
                    },
                    {
                        title: 'ナンバリング',
                        field: 'numbering',
                        align: "left"
                    },
                    {
                        title: 'リンク',
                        field: 'link',
                        filtering: false,
                        sorting: false
                    }
                ]}
                data={data}
                title="OIT Syllabus App"
                options={{
                    paging: false,
                    maxBodyHeight: "100%",
                    headerStyle: { position: "sticky", top: 0, whiteSpace: 'nowrap' },
                    filtering: true,
                }}
            />
        </div>
    );
}