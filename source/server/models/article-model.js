const _ = require('loadsh');
const Strings = require('../utils/String.js');
const query = require('../models/query');

module.exports.getArticles = function(type, from, offset) {
	let sql = null;
	let params = null;

	if (type) {
		sql =
			'SELECT a.Guid, a.Subject, a.Category, a.IsPrivated, a.CreationDate, ac.CommentsCount, a.ViewsCount FROM t_article a ' +
			'LEFT JOIN (SELECT ArticleGuid, COUNT(Guid) AS CommentsCount FROM t_comment GROUP BY ArticleGuid) AS ac ' +
			'ON ac.ArticleGuid = a.Guid ' +
			'WHERE a.Category=? ' +
			'ORDER BY a.CreationDate DESC LIMIT ?,?';
		params = [ type, from, offset ];
	} else {
		sql =
			'SELECT a.Guid, a.Subject, a.IsPrivated, a.CreationDate, ac.CommentsCount, a.ViewsCount FROM t_article a ' +
			'LEFT JOIN (SELECT ArticleGuid, COUNT(Guid) AS CommentsCount FROM t_comment GROUP BY ArticleGuid) AS ac ' +
			'ON ac.ArticleGuid = a.Guid ' +
			'ORDER BY a.CreationDate DESC LIMIT ?,?';
		params = [ from, offset ];
	}
	return query
		.execute({
			statement: sql,
			params: params
		})
		.then((rs) => {
			if (_.isEmpty(rs)) {
				return [];
			} else {
				return rs;
			}
		});
};

module.exports.getSingleArticle = function(id) {
	let sql =
		'SELECT a.Guid, a.Subject, a.Content, a.Category, a.IsPrivated, a.CreationDate, a.LastEditDate, ac.CommentsCount, a.ViewsCount FROM t_article a ' +
		'LEFT JOIN (SELECT ArticleGuid, COUNT(Guid) AS CommentsCount FROM t_comment GROUP BY ArticleGuid) AS ac ' +
		'ON ac.ArticleGuid = a.Guid ' +
		'WHERE a.Guid=?';
	return query
		.execute({
			statement: sql,
			params: [ id ]
		})
		.then((rs) => {
			if (_.isEmpty(rs)) {
				return [];
			} else {
				if (rs[0].IsPrivated) {
					delete rs[0].Content;
				}
				return rs[0];
			}
		});
};

module.exports.getLatestArticle = function() {
	let sql =
		'SELECT a.Guid, a.Subject, a.Content, a.CreationDate FROM t_article a ' +
		'ORDER BY a.CreationDate DESC LIMIT 1';
	return query
		.execute({
			statement: sql
		})
		.then((rs) => {
			if (_.isEmpty(rs)) {
				return [];
			} else {
				return rs[0];
			}
		});
};

module.exports.editArticle = function(article) {
	var [ columns, params ] = createStatement(article, 'edit');

	columns.push('LastEditDate=?');
	params.push(Strings.formatDate());

	params.push(article.Guid);

	let sql = 'UPDATE t_article SET ' + columns.join() + ' WHERE Guid=?';

	return query
		.execute({
			statement: sql,
			params: params
		})
		.then((rs) => {
			return rs.affectedRows;
		});
};

module.exports.createArticle = function(article) {
	// var [columns, params] = createStatement(article);

	// columns.push('CreationDate=?');
	// params.push(String.formatDate());

	let params = createParams(article);
	let sql = 'INSERT INTO t_article SET ?';

	// let sql = 'INSERT INTO t_article (' + columns.join(',') + ') VALUES (' + params.join(',') + ')';
	return query
		.execute({
			statement: sql,
			params: params
		})
		.then((rs) => {
			if (rs.affectedRows === 1) {
				let results = {};
				results.affectedRows = rs.affectedRows;
				results.id = params.Guid;
				return results;
			} else {
				throw new Error(rs.message);
			}
		});
};

module.exports.deleteArticle = function(id) {
	let sql = 'DELETE FROM t_article WHERE Guid=?';
	return query
		.execute({
			statement: sql,
			params: [ id ]
		})
		.then((rs) => {
			return rs.affectedRows;
		});
};

module.exports.increaseViewsCount = function(id) {
	let sql = 'UPDATE t_article SET ViewsCount=ViewsCount+1 WHERE Guid=?';
	return query
		.execute({
			statement: sql,
			params: [ id ]
		})
		.then((rs) => {
			return rs.affectedRows;
		});
};

module.exports.count = function(type) {
	let sql = 'SELECT COUNT(*) AS Count FROM t_article';

	if (type) {
		sql = 'SELECT COUNT(Category) AS Count FROM t_article WHERE Category=?';
		return query
			.execute({
				statement: sql,
				params: [ type ]
			})
			.then((rs) => {
				return rs[0].Count;
			});
	}

	return query
		.execute({
			statement: sql
		})
		.then((rs) => {
			return rs[0].Count;
		});
};

function createStatement(article, method) {
	let columns = [];
	let params = [];

	Object.keys(article).forEach((key) => {
		if (key) {
			if (method === 'edit' && key !== 'Guid') {
				columns.push(key + '=?');
				params.push(article[key]);
			} else {
				columns.push(key + '=?');
				params.push(article[key]);
			}
		}
	});

	return [ columns, params ];
}

function createParams(article) {
	let params = {};
	params.Guid = article.Guid;
	params.Subject = article.Subject;
	params.Content = article.Content;
	params.IsPrivated = article.IsPrivated;
	params.Category = article.Category;
	params.CreationDate = Strings.formatDate();

	return params;
}

// function processArticles(rs) {
// 	let articles = [];
// 	rs.forEach(row => {
// 		let article = _.find(articles, {Guid: row.Guid});
// 		let isNew = article ? false: true;

// 		if (isNew) {
// 			article = {
// 				Guid: row.Guid,
// 				Subject: row.Subject,
// 				Content: row.Content,
// 				Category: row.Category,
// 				CreationDate: row.CreationDate,
// 				IsPrivated: row.IsPrivated,
// 				ViewsCount: row.ViewsCount,
// 				CommentsCount: row.CommentsCount
// 			}

// 			articles.push(article);
// 		}
// 	});
// 	return articles;
// }
