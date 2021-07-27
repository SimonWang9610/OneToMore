const _ = require('loadsh');
const Strings = require('../../utils/String');
const query = require('../../models/query');

const getComments = function(articleGuid) {
	let sql = 'SELECT c.ID, c.Guid, c.Content, c.CreationAt, c.Author FROM t_comment c '
			+ 'WHERE c.ArticleGuid=? ORDER BY c.CreationAt';
	return query.execute({
		statement: sql,
		params: [articleGuid]
	}).then(rs => {
		if (_.isEmpty(rs)) {
			return [];
		} else {
			return rs;
		}
	});
};

const getComment = (commentGuid) => {
	let sql = 'SELECT c.Guid, c.Content, c.CreatedAt, c.Author FROM t_comment c '
		+ 'WHERE c.Guid=?';
	
	return query.execute({
			statement: sql,
			params: [commentGuid]
		}).then(rs => {
			if (_.isEmpty(rs)) {
				return [];
			} else {
				return rs;
			}
	});
	
}

const addComment = function(comment) {
	var [columns, params] = createStatement(comment);
	columns.push('CreatedAt=?');
	params.push(Strings.formatDate());

	let sql = 'INSERT INTO t_comment SET ' + columns.join();
	return query.execute({
		statement: sql,
		params: params
	}).then(rs => {
		if (rs.affectedRows === 1) {
			let result = {};
			result.affectedRows = rs.affectedRows;
			result.id = comment.Guid;
			return result;
		} else {
			throw new Error(rs.message);
		}
	});
};


const deleteComment = function(commentGuid) {
	let sql = 'DELETE FROM t_comment WHERE Guid=?';
	return qury.execute({
		statement: sql,
		params: [commentGuid]
	}).then(rs => {
		if (rs.affectedRows === 1) {
			return rs.affectedRows;
		} else {
			throw new Error(rs.message);
		}
	});
};

function createStatement(comment) {
	let columns = [];
	let params = [];

	Object.keys(comment).forEach(key => {
		if (key) {
			columns.push(key + '=?');
			params.push(comment[key]);
		}
	});

	return [columns, params];
}

module.exports.commentModel = {
	getComments,
	getComment,
	addComment,
	deleteComment,
}