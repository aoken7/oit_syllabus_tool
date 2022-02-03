# OIT Syllabus App

大阪工業大学**非公式**のシラバスアプリです。  
各自で必ず[公式のシラバス](https://www.oit.ac.jp/japanese/syllabus/index.html)も合わせて確認してください。  
本アプリケーションに記載されている情報の正確性、最新性、有用性等その他一切の事項について、いかなる保証をするものではありません。  
このような場合において、記載が不正確であったこと等により生じた、いかなる損害に関しても、一切の責任を負いかねます。

## 特徴

・情報科学部全学科・全学年のシラバスに対応(将来的には全学部・大学院に対応)  
・スマホからでも見やすいレスポンシブデザイン  
・PWA対応によりホーム画面にアプリを追加可能に

※ホーム画面への追加方法は以下のリンクをご参照ください。  
[iOSの追加方法](https://support.bccks.jp/faq/pwa_2020/)  
[PC・Androidの追加方法](https://support.google.com/chrome/answer/9658361)  

## 仕様

ソースコードは[GitHub](https://github.com/yashikota/oit-syllabus)で公開してます  
Contributed by [kota](https://github.com/yashikota)
[aoken](https://github.com/aoken7)
[Akirtn](https://github.com/Akirtn)
[maru](https://github.com/GenichiMaruo)  
2022/2/3時点での[大阪工業大学公式シラバス](https://www.oit.ac.jp/japanese/syllabus/)のデータに基づきます  
[知的財産の表記](https://raw.githubusercontent.com/yashikota/oit-syllabus/master/web/public/hyouki.txt)

## Scraping Tool

・Pythonで時間割PDFより講義コードを抽出  
・抽出した講義コードを元にスクレイピング  
・スクレイピング結果をJSONファイルに保存

## Web App

・React+Material-Table  
・SPA(シングルページアプリケーション)  
・PWA(プログレッシブウェブアプリ)  
・インクリメンタルサーチ  
・フィルタリング  
・ソート
