const articleModel = require('../models/article-model');
const Utils = require('../utils/Utils');

module.exports.getArticles = function(type, from, offset) {
	return articleModel.getArticles(type, from, offset);
};

module.exports.getSingleArticle = function(id) {
	return articleModel.getSingleArticle(id);
};

module.exports.getLatestArticle = function() {
	return articleModel.getLatestArticle();
};

module.exports.editArticle = function(article) {
	return articleModel.editArticle(article);
};

module.exports.createArticle = function(article) {
	if (!article.Guid) {
		article.Guid = Utils.uuid();
	}
	return articleModel.createArticle(article);
};

module.exports.deleteArticle = function(id) {
	return articleModel.deleteArticle(id);
};

module.exports.increaseViewsCount = function(id) {
	return articleModel.increaseViewsCount(id);
};

module.exports.count = function(type) {
	return articleModel.count(type);
};

// module.exports.getLikesCount = function(id) {
// 	return articleModel.getLikesCount(id);
// }

// module.exports.increaseLikeCounts = function(id) {
// 	return articleModel.increaseViewCounts(id);
// }
