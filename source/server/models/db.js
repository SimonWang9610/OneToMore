process.env.NODE_CONFIG_DIR = '../config'

const config = require('config');
const mysql = require('promise-mysql');

// config.mysqlOptions.typeCast = function castField(field, useDefaultTypeCasting) {
// 	if ((field.type == 'BIT') && (field.length ===1)) {
// 		let bytes = field.buffer();
// 		if (!bytes) return null;
// 		return (bytes[0] === 1);
// 	}
// };

const pool = mysql.createPool(config.mysqlOptions);

function getConnection() {
	// return pool.getConnection().disposer(function(connection) {
	// 	pool.releaseConnection(connection);
	// });
	let conn = null;
	return pool.then(function(p) {
		return p.getConnection();
	}).then(function(connection) {
		conn = connection;
		return conn;
	});
}

module.exports.escape = mysql.escape;
module.exports.escapeId = mysql.escapeId;
module.exports.format = mysql.format;
module.exports.pool = pool;
module.exports.getConnection = getConnection;