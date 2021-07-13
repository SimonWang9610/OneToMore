const commentModel = require('../models/comment-model');
const Utils = require('../utils/Utils');

module.exports.getComments = function(id) {
	return commentModel.getComments(id);
}

module.exports.addComment = function(comment) {
	if (!comment.Guid) {
		comment.Guid = Utils.uuid();
	}
	return commentModel.addComment(comment)
}

module.exports.deleteComment = function(id) {
	return commentModel.deleteComment(id);
}