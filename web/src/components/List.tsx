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
                        field: 'Ckougi',
                        align: "left",
                        defaultSort: 'asc'
                    },
                    {
                        title: '年次',
                        field: 'Cnenji',
                        align: "left",
                        type: 'numeric',
                        lookup: { 1: "1", 2: "2", 3: "3", 4: "4" }
                    },
                    {
                        title: '期間',
                        field: 'Ckikan',
                        align: "left",
                        lookup: { 前期: "前期", 後期: "後期" }
                    },

                    {
                        title: '単位',
                        field: 'Ctani',
                        align: "left",
                        type: 'numeric',
                        lookup: { 1: "1", 2: "2", 3: "3", 4: "4" }
                    },
                    {
                        title: '担当者',
                        field: 'Ctantousya',
                        align: "left"
                    },
                    {
                        title: '学部/学科',
                        field: 'Cgakka',
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
                        field: 'Cnumbering',
                        align: "left"
                    },
                    {
                        title: 'リンク',
                        field: 'Clink',
                        filtering: false,
                        sorting: false
                    }
                ]}
                {datas.map(data => (
                    Ckougi: "あああ",
                    Cnenji: "1",
                    Ckikan: "前期",
                    Ctani: "2",
                    Ctantousya: "おおお",
                    Cgakka: "情報科学",
                    Cnumbering: "き",
                    Clink: "く",
                ))}
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