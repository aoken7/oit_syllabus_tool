# OIT Syllabus App

大阪工業大学**非公式**のシラバスアプリです。  
<https://oit.yashikota.com>で公開しています。  
現時点では情報科学部のみ対応しています。(将来的には全学部・大学院に対応予定)  
各自で必ず
[公式のシラバス](https://www.oit.ac.jp/japanese/syllabus/index.html)
も合わせて確認してください。  
本アプリケーションに記載されている情報の正確性、最新性、有用性等その他一切の事項について、いかなる保証をするものではありません。  
このような場合において、記載が不正確であったこと等により生じた、いかなる損害に関しても、一切の責任を負いかねます。  
ソースコードは
[GitHub](https://github.com/yashikota/oit-syllabus)
で公開してます。  
Contributed by
[kota](https://github.com/yashikota)
[aoken](https://github.com/aoken7)
[Akirtn](https://github.com/Akirtn)
[maru](https://github.com/GenichiMaruo)  
2022/2/3時点での
[大阪工業大学公式シラバス](https://www.oit.ac.jp/japanese/syllabus/index.html)
のデータに基づきます。  
バグ、データの不備、機能要望、その他問い合わせは
[Twitter](https://twitter.com/awwoit)のリプ・DMか
[マシュマロ](https://marshmallow-qa.com/awwoit)(匿名)、
[GitHubのissues](https://github.com/yashikota/oit-syllabus/issues)
までお願いします。  
[知的財産の表記](https://raw.githubusercontent.com/yashikota/oit-syllabus/master/web/public/hyouki.txt)

## 使い方

**ver0.2.0の画面**  
![トップページ](https://raw.githubusercontent.com/yashikota/oit-syllabus/master/web/public/top.png)
右上の検索窓はテーブル全体を検索し、各列の一番上にある検索窓はその列のみ検索可能です。  
各列の検索結果は重複して適応できるため、例えば1年次の2単位のシラバスのみを表示することも可能です。  
また、各列一番上の↑↓を押せば昇順降順のソートができます。  
公式シラバスと書かれたボタンをタップすることで公式シラバスの該当するページを表示します。  
右上のアイコンをタップすることでライトテーマ・ダークテーマに切り替わります。  
※ホーム画面への追加方法は以下のリンクをご参照ください。  
[iOS・Androidの追加方法](https://support.bccks.jp/faq/pwa_2020/)  
[PC(Chrome・Edge)の追加方法](https://support.google.com/chrome/answer/9658361)  

## Scraping Tool

・Pythonで時間割PDFより講義コードを抽出  
・抽出した講義コードを元にスクレイピング  
・スクレイピング結果をJSONファイルに保存

## Web App

・React+MUI+Material-Tableで構築  
・Cloudflare Pagesにホスティング
