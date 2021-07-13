// store assets locally at the server-side
const fileModel = require('../models/file-model');
const fs = require('fs-extra');
const Utils = require('../utils/Utils');
const MimeType = require('../utils/MimeType');
const path = require('path');

module.exports.saveFiles = function(articleGuid, files) {
	if (files.urls.length) {
		var ids = [];
		var downloadUrls = [];
		var contentTypes = [];

		files.urls.forEach(async (url, index) => {
			let { sourcePath, destFolder, destPath, filename } = splitFileUrl(url);
			let { downloadUrl, id } = formatUrl(destPath, filename);
			downloadUrls.push(downloadUrl);
			ids.push(id);
			contentTypes.push(MimeType.getContentType(filename));

			await fs.ensureDir(destFolder);
			await fs.move(sourcePath, destPath);
		});

		return fileModel.saveFiles(ids, downloadUrls, files.oldNames, contentTypes, articleGuid);
	} else {
		let affectedRows = 0;
		return Promise.resolve(affectedRows);
	}
};

module.exports.deleteFiles = function(articleGuid) {
	return fileModel.deleteFiles(articleGuid);
};

function splitFileUrl(url) {
	let pos = url.indexOf('vault');
	let namePos = url.lastIndexOf('/');
	let filename = url.substring(namePos + 1);

	let destFolder = path.join(__dirname, '../', url.substring(pos, namePos));

	let sourcePath = path.join(__dirname, '../', 'vault/temp', filename);

	let destPath = path.join(__dirname, '../', url.substring(pos));

	return { sourcePath, destFolder, destPath, filename };
}

function formatUrl(destPath, filename) {
	let pos = destPath.indexOf('vault');
	let extPos = filename.lastIndexOf('.');
	let downloadUrl = destPath.substring(pos - 1);
	let id = filename.substring(0, extPos);
	return { downloadUrl, id };
}
