const { likeModel } = require("../../models/article/like");

const liked = (userGuid, articleGuid) => {
    return likeModel.liked(userGuid, articleGuid);
}

const like = (userGuid, articleGuid) => {
    return likeModel.like(userGuid, articleGuid);
}

const dislike = (userGuid, articleGuid) => {
    return likeModel.dislike(userGuid, articleGuid);
}

const getLikes = (articleGuid) => {
    return likeModel.getLikes(articleGuid);
}

module.exports.likeLogic = {
    like,
    liked,
    dislike,
    getLikes,
}