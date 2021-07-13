
const _ = require('loadsh');
// const moment = require('moment');

var newLine =/\r\n|\r|\n/g;

module.exports.splitByNewLine = function(str) {
	return str.trim().split(newLine);
};

module.exports.exists = function(str) {
	if (typeof str === 'undefined') return false;
	return true;
};

module.exports.existsAndNotNull = function(str) {
	if (typeof str === 'undefined' || str === null) return false;
	return true;
};

module.exports.isNullOrEmpty = function(str) {
	return !str;
};


module.exports.formatDate = function(dateString) {
	let date = null;
	date = new Date();

	// if (dateString && typeof dateString === 'string') {
	// 	let momentObj = moment(dateString, 'YYYY/MM/DD');
	// 	date = momentObj.toDate();
	// } else {
	// 	date = new Date();
	// }

	return toMySQLFormat(date);
};

function twoDigits(d) {
	if (0 <= d && d < 10) return '0' + d.toString();
	if (-10 < d && d < 0) return '-0' + (-1*d).toString();
	return d.toString();
}


function toMySQLFormat(date) {
	return date.getUTCFullYear() + '-'
		+ twoDigits(1 + date.getUTCMonth()) + '-'
		+ twoDigits(date.getUTCDate()) + ' '
		+ twoDigits(date.getUTCHours()) + ':'
		+ twoDigits(date.getUTCMinutes()) + ':'
		+ twoDigits(date.getUTCSeconds());
}