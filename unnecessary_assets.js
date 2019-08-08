/*
不要リソース割出くん
*/
const fs = require('fs');
const glob = require('glob');
const puppeteer = require('puppeteer');

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

// 正規表現
const regexp = new RegExp(base + '(.*?).(png|jpe?g|svg|gif|css|js)$', 'g');

// ローカルのリソース一覧
const local_assets_array = [];

// 実際にWeb表示時に使われるリソース一覧
const web_assets_array = [];

// 不要なリソース一覧
let unnecessary_assets_array = [];

async function main() {
	// ローカルのプロジェクトフォルダからアセットのパスを取得
	glob.sync(local_path + '/**/*.{png,jpg,jpeg,svg,gif,css,js}').map(function(file) {
		local_assets_array.push(file.replace(local_path, ''));
	});

	// ヘッダレスChrome起動
	puppeteer.launch().then(async browser => {
		const page = await browser.newPage();
		await page.setViewport({
			width: 1200,
			height: 950
		});
		await page.on('response', response => {
			const assets_url = response.url();
			if (assets_url.match(regexp)) {
				web_assets_array.push(assets_url.replace(base, ''));
			}
		});

		for (let i = 0; i < urls.length; i++) {
			const url = urls[i];
			await page.goto(`${url}`, { waitUntil: 'load' });
		}

		await browser.close();

		// リソース一覧を表示
		console.log('使用リソース一覧');
		console.table(web_assets_array);

		// ローカルのリソース一覧から、Web表示時に使われるリソースを削除
		unnecessary_assets_array = local_assets_array.filter(asset_web => web_assets_array.indexOf(asset_web) == -1);

		// ソートする
		unnecessary_assets_array.sort();

		// 改行を追加
		const unnecessary_assets_str = unnecessary_assets_array.join('\n');

		// 不要なリソース一覧をテキストファイルに出力
		fs.writeFileSync('results.txt', unnecessary_assets_str);
	});
}
main();