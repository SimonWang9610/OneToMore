const { AuthenticationError, UserInputError } = require('apollo-server');
const { Article } = require("../../models/Article");
const { Comment } = require("../../models/Comment");
const { Collection } = require("../../models/Collection");

const getArticles = async () => {
    try {
        const articles = await Article.find();
        return articles;
    } catch (err) {
        throw new Error(err);
    }
}

const getSingle = async (_, {articleId}) => {
    try {
        const article = await Article.find({ _id: articleId });
        if (article) {
            return article;
        } else {
            throw new Error(article);
        }
    } catch (err) {
        throw new Error(err);
    }


}

const getComments = async (_, { articleId }) => {
    try {
        const comments = await Article.find({ _id: articleId }, 'comments');

        if (comments) {
            return comments;
        } else {
            throw new Error(comments);
        }

    } catch (err) {
        throw new Error(err);
    }
}

const getCollections = async (_, { category }) => {
    try {
        const collections = await Collection.find({ category: category });

        if (collections) {
            return collections;
        } else {
            return `Not found collections for ${category}`;
        }
    } catch (err) {
        throw new Error(err);
    }

}

const Query = {
    getArticles,
    getSingle,
    getComments,
    getCollections,
};

const createArticle = async (_, { title, abstract, content, author }) => {
    if (content.trim() === '') {
        throw new Error("Content must not be empty!");
    }

    // let createTime = new Date().toISOString();

    const newArticle = new Article({
        title: title,
        content: content,
        abstract: abstract,
        author: author,
        createdAt: 'create',
        modifiedAt: 'modify',
        comments: [],
        likes: [],
        collects: [],
        commentCount: 0,
        likeCount: 0,
    });

    return await newArticle.save().then(() => {
        return "Inserted successfully";
    })
}

const createComment = async (_, { id, content, author }) => {
    if (content.trim() === "") {
        throw new Error("Comment must not be empty!");
    }

    const newComment = {
        author: author,
        content: content,
        createdAt: "today",
    };

    return await Article.findByIdAndUpdate(id, {
        $inc: {commentCount: 1},
        $push: {
            comments: newComment
        }
    }).then(() => {
        return "insert one comment";
    })
}

const deleteArticle = async (_, { id }) => {
    try {
        // TODO remove all documents related to `id` Article
        const { _, deletedCount } = await Article.deleteOne({ _id: id });

        if (deletedCount) {
            return `Deleted ${deletedCount} document!`;
        } else {
            return "Failed to delete";
        }
    } catch (err) {
        throw new Error(err);
    }
}

const likeArticle = async(_, { id }) => {
    try {
        //TODO create @newObject according to authentication

        const newLike = {};

        const liked = await Article.findByIdAndUpdate(id, {
            $inc: { likeCount: 1 },
            $push: {
                likes: newLike
            }
        });

        if (liked) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        throw new Error(err);
    }
}

const collectArticle = async (_, { id }) => {
    try {
        //TODO create @newObject according to authentication

        const newCollect = {};
        const collected = await Article.findByIdAndUpdate(id, {
            $push: {
                collects: newCollect,
            }
        });

        if (collected) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        throw new Error(err);
    }
}

const Mutation = {
    createArticle,
    createComment,
    deleteArticle,
    likeArticle,
    collectArticle,
};

module.exports = {
    Query,
    Mutation,
}