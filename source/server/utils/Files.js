const Promise = require('bluebird');
const fs = require('fs');
const mkdirp = require('mkdirp');

let Files = {
	mkdir: function(path) {
		return new Promise((resolve, reject) => {
			fs.access(path, fs.constants.F_OK, (err) => {
				if (err) {
					mkdirp(path, (err) => {
						if (err) {
							reject(err);
						} else {
							resolve(
								Promise.promisifyAll({
									success: true
								})
							);
						}
					});
				} else {
					resolve(
						Promise.promisifyAll({
							success: true,
							path: path
						})
					);
				}
			});
		});
	},
	copyFile: function(srcPath, dstPath) {
		return new Promise((resolve, reject) => {
			fs.copyFile(srcPath, dstPath, (err) => {
				if (err) {
					reject(err);
				} else {
					fs.unlink(srcPath, (err) => {
						resolve(
							Promise.promisifyAll({
								success: true,
								srcPath: srcPath,
								dstPath: dstPath
							})
						);
					});
				}
			});
		});
	},
	readFile: function(path) {
		return new Promise((resolve, reject) => {
			fs.readFile(path, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	},

	renameFile: function(srcPath, dstPath) {
		return new Promise((resolve, reject) => {
			fs.rename(srcPath, dstPath, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	},

	deleteFile: function(path) {
		return new Promise((resolve, reject) => {
			fs.unlink(path, (err) => {
				resolve(
					Promise.promisifyAll({
						success: true,
						deleted: err ? false : true
					})
				);
			});
		});
	}
};

module.exports = Files;
