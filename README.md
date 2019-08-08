[![NPM version](https://img.shields.io/npm/v/unnecessary_assets.svg)](https://www.npmjs.com/package/unnecessary_assets)
[![Build Status](https://img.shields.io/travis/ryo-hisano/unnecessary_assets.svg)](https://travis-ci.org/ryo-hisano/unnecessary_assets)
[![Dependency Status](https://img.shields.io/david/ryo-hisano/unnecessary_assets.svg)](https://david-dm.org/ryo-hisano/unnecessary_assets)

# 概要

Puppeteerを使い、調査したいサイト一覧から利用リソース一覧を取得。
ローカルフォルダと構造を見比べて、未使用のリソース一覧をテキストファイルで出力してくれます。

## 使い方

```bash
git clone https://github.com/ryo-hisano/unnecessary_assets
cd unnecessary_assets
```

「unnecessary_assets.js」を編集。

```javascript
// ローカルパス指定
const local_path = '/Users/ryo_hisano/htdocs/local_files.com/';

// URL指定（改行で複数指定）
const urls = [
    'https://remote_site.com/',
    'https://remote_site.com/price/',
    'https://remote_site.com/about/',
    'https://remote_site.com/company/'
];

// ベースURL
const base = 'https://remote_site.com/';
```

```bash
$ npm run list
```

あるいは

```bash
$ node unnecessary_assets.js
```

## 未使用リソースの一括削除

「unnecessary_assets_remove.js」を編集。

```javascript
// ローカルパス指定
const local_path = '/Users/ryo_hisano/htdocs/local_files.com/';
````

下記を実行（要注意！ファイルが一斉に削除されます）。

```bash
$ npm run remove
```

あるいは

```bash
$ node unnecessary_assets_remove.js
```