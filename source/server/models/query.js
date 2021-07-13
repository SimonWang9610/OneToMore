const Promise = require('bluebird');
const db = require('../models/db');

function executeQuery(options, connection) {

	if (options.params) {
			return connection.query(options.statement, options.params).then(results => {
					connection.release();
					return results;
				}).catch(err => {
					throw err;
			});
		} else {
			return connection.query(options.statement).then(results => {
					connection.release();
					return results;
				}).catch(err => {
					throw err;
			});
		}
}

module.exports.escape = db.escape;
module.exports.escapeId = db.escapeId;
module.exports.format = db.format;
module.exports.pool = db.pool;

module.exports.execute = function(options, connection) {
	if (!options.statement) {
		throw new Error('Missing query statment');
	}

	if (connection) {
		return executeQuery(options, connection);
	} else {
		return Promise.using(db.getConnection(), function(connection) {
			return executeQuery(options, connection);
		});
	}
};