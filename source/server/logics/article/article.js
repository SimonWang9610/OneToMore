const { articleModel } = require('../../models/article');
const Utils = require('../../utils/Utils');

const getArticles = function(type, from, offset) {
	return articleModel.getArticles(type, from, offset);
};

const getSingleArticle = function(id) {
	return articleModel.getSingleArticle(id);
};

const getLatestArticle = function() {
	return articleModel.getLatestArticle();
};

const editArticle = function(article) {
	return articleModel.editArticle(article);
};

const createArticle = function(article) {
	if (!article.Guid) {
		article.Guid = Utils.uuid();
	}
	return articleModel.createArticle(article);
};

const deleteArticle = function(id) {
	return articleModel.deleteArticle(id);
};

const increaseViewsCount = function(id) {
	return articleModel.increaseViewsCount(id);
};

const count = function(type) {
	return articleModel.count(type);
};

// const getLikesCount = function(id) {
// 	return articleModel.getLikesCount(id);
// }

// const increaseLikeCounts = function(id) {
// 	return articleModel.increaseViewCounts(id);
// }

module.exports.articleLogic = {
	getArticles,
	getSingleArticle,
	getLatestArticle,
	editArticle,
	createArticle,
	deleteArticle,
	increaseViewsCount,
	count,
}