const { model, Schema } = require('mongoose');

const articleSchema = new Schema({
    title: String,
    author: String,
    createdAt: String,
    modifiedAt: String,
    abstract: String,
    content: String,
    comments: [{
        author: String,
        content: String,
        createdAt: String
    }],
    likes: [{
        username: String,
        createdAt: String,
    }],
    collects: [{
        username: String,
        createdAt: String,
    }],
    commentCount: Number,
    likeCount: Number,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'owners',
    }
});

// const articleSchema = new Schema({
//     title: String,
//     author: String,
//     createdAt: String,
//     modifiedAt: String,
//     abstract: String,
//     content: String,
//     owner: {
//         type: Schema.Types.ObjectId,
//         ref: 'owners',
//     }
// });

module.exports.Article = model('Articles', articleSchema);
