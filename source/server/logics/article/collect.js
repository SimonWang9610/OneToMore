const { collectModel } = require("../../models/article");

const getCollections = (userGuid, category) => {
    return collectModel.getCollections(userGuid, category);
}

const collected = (userGuid, articleGuid) => {
    return collectModel.collected(userGuid, articleGuid);
}

const collect = (userGuid, articleGuid, category) => {
    return collectModel.collect(userGuid, articleGuid);
}

const remove = (userGuid, articleGuid) => {
    return collectModel.remove(userGuid, articleGuid);
}

module.exports.collectLogic = {
    getCollections,
    collect,
    collected,
    remove,
}