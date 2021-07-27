const { likeModel } = require("../../models/article");

const liked = (userGuid, articleGuid) => {
    return likeModel.liked(userGuid, articleGuid);
}

const like = (userGuid, articleGuid) => {
    return likeModel.like(userGuid, articleGuid);
}

const dislike = (userGuid, articleGuid) => {
    return likeModel.dislike(userGuid, articleGuid);
}

module.exports.likeLogic = {
    like,
    liked,
    dislike,
}