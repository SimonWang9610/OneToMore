const _ = require('loadsh');
const Strings = require('../../utils/String.js');
const query = require('../query');

const getArticles = function(from, offset, type) {
	let sql = null;
	let params = null;

	if (type) {
		sql =
			'SELECT a.Guid, a.Title, a.Category, a.CreatedAt, ac.CommentsCount, al.LikeCounts, a.ViewsCounts FROM t_article a ' +
			'LEFT JOIN (SELECT ArticleGuid, COUNT(Guid) AS CommentsCount FROM t_comment GROUP BY ArticleGuid) AS ac ' +
			'ON ac.ArticleGuid = a.Guid ' +
			'LEFT JOIN (SELECT ArticleGuid, COUNT(ID) AS LikeCounts FROM t_like GROUP BY ArticleGuid) AS al ON al.ArticleGuid = a.Guid '
			'WHERE a.Category=? ' +
			'ORDER BY a.CreatedAt DESC LIMIT ?,?';
		params = [ type, from, offset ];
	} else {
		sql =
			'SELECT a.Guid, a.Title, a.Author, a.LastModified, a.CreatedAt, ac.CommentsCount, al.LikesCount, a.ViewsCount FROM t_article a ' +
			'LEFT JOIN (SELECT ArticleGuid, COUNT(Guid) AS CommentsCount FROM t_comment GROUP BY ArticleGuid) AS ac ' +
			'ON ac.ArticleGuid = a.Guid ' +
			'LEFT JOIN (SELECT ArticleGuid, COUNT(ID) AS LikesCount FROM t_like GROUP BY ArticleGuid) AS al ON al.ArticleGuid = a.Guid '
			'ORDER BY a.CreatedAt';
		// params = [ from, offset ];
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

const getSingleArticle = function(id) {
	let sql =
		'SELECT a.Guid, a.Title, a.Author, a.Content, a.Category, a.CreatedAt, a.LastModified, ac.CommentsCount, al.LikeCounts, a.ViewsCount FROM t_article a ' +
		'LEFT JOIN (SELECT ArticleGuid, COUNT(Guid) AS CommentsCount FROM t_comment GROUP BY ArticleGuid) AS ac ON ac.ArticleGuid = a.Guid ' +
		'LEFT JOIN (SELECT ArticleGuid, COUNT(ID) AS LikeCounts FROM t_like GROUP BY ArticleGuid) AS al ON al.ArticleGuid = a.Guid ' +
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

const getLatestArticle = function() {
	let sql =
		'SELECT a.Guid, a.Subject, a.Content, a.CreatedAt FROM t_article a ' +
		'ORDER BY a.CreatedAt DESC LIMIT 1';
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

const editArticle = function(article) {
	var [ columns, params ] = createStatement(article, 'edit');

	columns.push('LastModified=?');
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

const createArticle = function(article) {
	// var [columns, params] = createStatement(article);

	// columns.push('CreatedAt=?');
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

const deleteArticle = function (id) {
	// TODO: should delete all comments of the article
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

const increaseViewsCount = function(id) {
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

const count = function(type) {
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
	params.Title = article.Title;
	params.Content = article.Content;
	params.Category = article.Category;
	params.CreatedAt = Strings.formatDate();
	params.Author = article.Author;
	params.ViewsCount = 0;
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
// 				CreatedAt: row.CreatedAt,
// 				IsPrivated: row.IsPrivated,
// 				ViewsCount: row.ViewsCount,
// 				CommentsCount: row.CommentsCount
// 			}

// 			articles.push(article);
// 		}
// 	});
// 	return articles;
// }

module.exports.articleModel = {
	getArticles,
	getSingleArticle,
	getLatestArticle,
	editArticle,
	createArticle,
	deleteArticle,
	increaseViewsCount,
	count,
}