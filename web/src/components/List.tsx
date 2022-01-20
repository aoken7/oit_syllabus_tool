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
                            minWidth: 300,
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
                        align: "left",
                        lookup: { 前期: "前期", 後期: "後期" }
                    },
                    {
                        title: '単位',
                        field: 'tani',
                        align: "left",
                        type: 'numeric',
                        lookup: { 1: "1", 2: "2", 3: "3", 4: "4" }
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
                            情報科学: "情報科学",
                            工学: "工学",
                            都市デザイン: "都市デザイン",
                            建築: "建築",
                            機械: "機械",
                            電気電子: "電気電子",
                            電子情報: "電子情報",
                            応用化学: "応用化学",
                            環境: "環境",
                            生命: "生命",
                            ロボティクスデザイン: "ロボティクスデザイン",
                            ロボット: "ロボット",
                            ステムデザイン: "システムデザイン",
                            空間デザイン: "空間デザイン",
                            知的財産: "知的財産"
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