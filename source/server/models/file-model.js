const query = require('../models/query');
const Strings = require('../utils/String');

module.exports.saveFiles = function(ids, downloadUrls, oldNames, contentTypes, articleGuid) {
	let sql = 'INSERT INTO t_file (Guid, DownloadUrl, OriginalName, ContentType, CreationDate, ArticleGuid) VALUES ?';
	let params = createParams(ids, downloadUrls, oldNames, contentTypes, articleGuid);

	return query
		.execute({
			statement: sql,
			params: [ params ]
		})
		.then((affectedRows) => {
			return affectedRows;
		});
};

module.exports.deleteFiles = function(id) {
	let sql = 'DELETE FROM t_file WHERE ArticleGuid=?';
	return query
		.execute({
			statement: sql,
			params: [ id ]
		})
		.then((affectedRows) => {
			return affectedRows;
		});
};

function createParams(ids, urls, names, contentTypes, articleGuid) {
	let params = [];
	urls.forEach((url, index) => {
		let date = Strings.formatDate();
		let row = [ ids[index], url, names[index], contentTypes[index], date, articleGuid ];
		params.push(row);
	});
	return params;
}
