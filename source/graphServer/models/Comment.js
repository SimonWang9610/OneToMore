const { model, Schema } = require('mongoose');

const commentSchema = new Schema({
    author: String,
    createdAt: String,
    content: String,
    articleId: String,
});

module.exports.Comment = model('Comment', commentSchema);