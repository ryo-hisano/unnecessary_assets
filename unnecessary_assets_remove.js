/*
不要リソース削除くん
*/
const fs = require('fs');
const readline = require('readline');

// ローカルパス指定
const local_path = '/Users/ryo_hisano/htdocs/local_files.com/';

// 不要なリソース一覧のテキストファイル
const config_file = 'results.txt';

// 削除したファイル数カウント
let filenum = 0;

async function main() {
	// 読み取りストリーム
	const input = fs.createReadStream(config_file);
	const promise = new Promise(function(resolve, reject) {
		var lineReader = readline.createInterface({
			input: input
		});
		input.on('end', () => {
			resolve();
		});

		lineReader.on('line', line => {
			const file = local_path + line;

			// 同期的にファイル削除
			try {
				fs.unlinkSync(file);
				filenum++;
				console.log(file + ' を削除しました');
				return true;
			} catch (err) {
				console.error(file + ' を削除できませんでした');
				return false;
			}
		});
	});

	promise.finally(resolveResult => {
		if (filenum > 0) {
			console.log('全 ' + filenum + ' ファイルを削除しました。');
		}
	});
}
main();