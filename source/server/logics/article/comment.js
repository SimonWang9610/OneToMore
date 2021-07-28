const { commentModel } = require('../../models/article/comment');
const Utils = require('../../utils/Utils');

const getComments = function(id) {
	return commentModel.getComments(id);
}

const getComment = (id) => {
	return commentModel.getComment(id);
}

const addComment = function(comment, author) {
	if (!comment.Guid) {
		comment.Guid = Utils.uuid();
	}
	comment.Author = author;
	
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