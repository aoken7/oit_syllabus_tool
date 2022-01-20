import MaterialTableCore from '@material-table/core';
import React from 'react';
import datas from "../data.json"

export const List = () => {
    return (
        <div style={{ maxWidth: '100%' }}>
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
                        type: 'numeric',
                        lookup: { 1: "1", 2: "2", 3: "3", 4: "4" }
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
                        align: "left"
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
                ]} data={[
                    {
                        name: 'Mehmet',
                        surname: 'Baran',
                        birthYear: 1987,
                        birthCity: 63,
                        imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4'
                    },
                    {
                        name: 'Zerya Betül',
                        surname: 'Baran',
                        birthYear: 2017,
                        birthCity: 34,
                        imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4'
                    },
                ]}
                title="OIT Syllabus App"
                options={{
                    paging: false,
                    maxBodyHeight: 600,
                    headerStyle: { position: "sticky", top: 0, whiteSpace: 'nowrap' },
                    filtering: true,
                }}
            />
        </div>
    );
}