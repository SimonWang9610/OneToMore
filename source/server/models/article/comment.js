const _ = require('loadsh');
const Strings = require('../../utils/String');
const query = require('../../models/query');

const getComments = function (articleGuid) {
	let sql = 'SELECT c.Guid, c.Content, c.CreationDate, c.Author FROM t_comment c '
		+ 'WHERE c.ArticleGuid=? ORDER BY c.CreationDate';
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
	let sql = 'SELECT c.Guid, c.Content, c.CreationDate, c.Author, u.Username 		FROM t_comment c ' +
		'LEFT JOIN (SELECT Username, Guid FROM t_user GROUP BY Username) AS u ON u.Guid = c.Author WHERE c.Guid=?';

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

const addComment = function (comment) {
	var [columns, params] = createStatement(comment);
	columns.push('CreationDate=?');
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


const deleteComment = function (commentGuid, userGuid) {
	let sql = 'DELETE FROM t_comment WHERE Guid=? AND Author=?';
	return query.execute({
		statement: sql,
		params: [commentGuid, userGuid]
	}).then(rs => {
		if (rs.affectedRows === 1) {
			return rs.affectedRows;
		} else {
			throw new Error(rs.message);
		}
	});
};

const count = (articleGuid) => {
	let sql = "SELECT COUNT(id) AS Count WHERE ArticleGuid=?";
	return query.execute({
		statement: sql,
		params: [articleGuid]
	}).then(rs => {
		return rs[0].Count;
	});
}
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
	count,
}