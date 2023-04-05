# iOSにも対応したWEBプッシュ通知サンプル

本リポジトリはiOSにも対応したWEBプッシュ通知サンプルになります。
PHPでWEBプッシュ通知を送る処理も含まれています。

なお、Firebase Cloud Messaging（FCM）を使用して、WEBプッシュ通知を送っています。


Firebaseへの登録手順等は次のリンクからご確認下さい。<br>
[FCMを利用してPHPからwebプッシュを送る](https://next-code.jp/blog/tech/firebase/fcm%e3%82%92%e5%88%a9%e7%94%a8%e3%81%97%e3%81%a6php%e3%81%8b%e3%82%89web%e3%83%97%e3%83%83%e3%82%b7%e3%83%a5%e3%82%92%e9%80%81%e3%82%8b/)


## 設定値の書き換え

基本的には、それぞれのファイルを見て、内容を理解して中身を変更頂きたいと思っています。<br>
確実に変更しないといけない部分があるがあるので、そちらだけ記載しておきます。<br>
なおこの内容は、次のリンクにも記載さいれています。<br>
[FCMを利用してPHPからwebプッシュを送る](https://next-code.jp/blog/tech/firebase/fcm%e3%82%92%e5%88%a9%e7%94%a8%e3%81%97%e3%81%a6php%e3%81%8b%e3%82%89web%e3%83%97%e3%83%83%e3%82%b7%e3%83%a5%e3%82%92%e9%80%81%e3%82%8b/)

### index.html

* `firebaseConfig`をFirebaseでアプリ登録をした際に表示される値に書き換え
* `<ウェブプッシュ証明書鍵ペア>`をFirebaseのウェブプッシュ証明書を作成した際に表示される鍵ペアに書き換え


### firebase-messagins-sw.js

* `firebaseConfig`をFirebaseでアプリ登録をした際に表示される値に書き換え


### send.php

* `<サーバーキー>`をFirebaseでAPIを有効時に表示される「サーバーキー」に書き換え
* `<送りたい人のトークン>`を端末でWEBプッシュ通知を許可した際に表示されるtokenに書き換え


## ファイルの役割

| ファイル名                    | 内容                                               |
|:-------------------------|:-------------------------------------------------|
| firebase-messaging-sw.js | WEBプッシュ通知が送られた時に裏で動くJavaScript。<br>ServiceWorker |
| index.html               | サイトと同じ。ブラウザで開いてウェブプッシュ通知を許可する為に必要。               |
| manifest.json            | PWA化する為に必要な情報ファイル。 |
| send.php | WEBプッシュ通知を送る。Firebase HTTP APIを使用。 |
| sw.js | 端末でアプリとしてインストールした際に、裏で動くJavaScript。<br>ServiceWorker。 |


## 気をつけるべき点

このサンプルを使用してWEBプッシュ通知を実装する上で気をつけるべき点です。

* iOSにWEBプッシュ通知を送るには、PWAが必須となります。<br>Safariで閲覧するだけでは、WEBプッシュ通知を送ることは出来ません。
* iOS16.4の時点では、端末（iPhone）のSafariの設定から`Push API`をオンにしないとWEBプッシュ通知を受け取る事が出来ません。
* 通知の許可リクエストは読み込み時（onload）に実行してもiOSでは動きません。<br>ボタンを押下した（onclick）等の何かのアクションを挟まないと動きません。<br>ただ、細かい検証はしていないので、間違いの可能性もあります。
* PWAでは`console.log`で値を確認といった事が出来ません。`alert`を使用しましょう。<br>やり方を知らないだけで何か方法があるかもしれません。
* Firebaseの次の関数を使用すると、端末（iPhone）では正常に動きません。<br>本リポジトリでは使用していませんが、他の記事を見た際に使用されていたらご注意下さい。<br>`messaging.usePublicVapidKey("~~~");`