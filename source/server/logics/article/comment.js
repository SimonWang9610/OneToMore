const { commentModel } = require('../../models/article');
const Utils = require('../utils/Utils');

const getComments = function(id) {
	return commentModel.getComments(id);
}

const getComment = (id) => {
	return commentModel.getComment(id);
}

const addComment = function(comment) {
	if (!comment.Guid) {
		comment.Guid = Utils.uuid();
	}
	return commentModel.addComment(comment)
}

const deleteComment = function(id) {
	return commentModel.deleteComment(id);
}

module.exports.commentLogic = {
	getComments,
	getComment,
	addComment,
	deleteComment,
}