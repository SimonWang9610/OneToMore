const config = require('config');
const crypto = require('crypto');
const path = require('path');
const { uuid } = require('uuidv4');
const Files = require('../utils/Files');

var utils = {
	createBanner: function() {
		let html = [];
		let src = '/api/v1/banner';
		let style =
			"background-image: url('" +
			src +
			"'); background-repeat: no-repeat; background-size: cover; background-position: center center;";

		html.push('<div>');
		html.push('<div id="bannerBg" style="' + style + '">');
		html.push('</div>');
		html.push('</div>');
		return html.join('');
	},

	createNavbar: async function(landingPage) {
		let filePath = 'config/templates/navbar.html';
		let data = await Files.readFile(filePath);
		return data.toString();
	},

	createFooter: async function() {
		let filePath = 'config/templates/footer.html';
		let data = await Files.readFile(filePath);
		return data.toString();
	},

	resp: function(res, success, message, data) {
		if (data) {
			return res.json({
				success: success,
				message: message,
				data: data
			});
		} else {
			return res.json({
				success: success,
				message: message
			});
		}
	},

	createSaltKey: function(length) {
		return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
	},

	createHashPassword: function(password, saltKey, algorithm) {
		let hash = crypto.createHash(algorithm).update(password + saltKey).digest('hex').toString();
		return hash.replace('-', '').toUpperCase();
	},

	uuid: function() {
		return uuid().toUpperCase();
	},

	getLang: function(req) {
		let lang = req.query.lang;
		if (lang) {
			return lang;
		} else {
			return 'en';
		}
	},

	getExtName: function(filename) {
		let pos = filename.lastIndexOf('.');
		if (pos !== -1) {
			return filename.substring(pos + 1);
		}
		return null;
	}
};

module.exports = utils;
