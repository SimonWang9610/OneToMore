const { model, Schema } = require('mongoose');

const collectionSchema = new Schema({
    owners: String,
    createdAt: String,
    category: [
        {
            title: String,
            author: String,
            commentCount: Number,
            likeCount: Number,
        }
    ],
});

module.exports.Collection = model("Collection", collectionSchema);