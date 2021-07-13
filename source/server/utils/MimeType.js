const config = require('config');
var MimeType = {
	getContentType: function(filename) {
		let pos = filename.lastIndexOf('.');
		let extension = pos != -1 ? filename.substring(pos + 1) : null;
		let ct = null;

		if (extension) {
			extension = extension.toLowerCase();
			if (extension === 'txt') {
				ct = 'text/plain';
			} else if (extension === 'css') {
				ct = 'text/css';
			} else if (extension === 'json') {
				ct = 'application/json';
			} else if (extension === 'jpg') {
				ct = 'image/jpg';
			} else if (extension === 'png') {
				ct = 'image/png';
			} else if (extension === 'mp4') {
				ct = 'video/mp4';
			} else {
				ct = 'application/octet-stream';
			}
		} else {
			ct = 'application/octet-stream';
		}

		return ct;
	},

	isImageFile: function(filename) {
		let pos = filename.lastIndexOf('.');
		let ext = pos != -1 ? filename.substring(pos + 1) : null;

		if (ext) {
			ext = ext.toLowerCase();
			if (ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext === 'gif') {
				return true;
			}
		}
		return false;
	},

	isVideoFile: function(filename) {
		let pos = filename.lastIndexOf('.');
		let ext = pos != -1 ? filename.substring(pos + 1) : null;

		if (ext) {
			ext = ext.toLowerCase();
			if (ext === 'mp4' || ext === 'mov' || ext === 'avi' || ext === '3gp' || ext === 'wmv') {
				return true;
			}
		}

		return false;
	}
};

module.exports = MimeType;
