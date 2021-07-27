const _ = require("loadsh");
const query = require("../../models/query");
const Strings = require('../../utils/String');


const liked = (userGuid, articleGuid) => {
    let sql = "SELECT COUNT(ID) FROM t_like WHERE ArticleGuid=?, UserGuid=?";
    return query.execute({
        statement: sql,
        params: [articleGuid, userGuid]
    }).then(rs => {
        if (_.isEmpty(rs)) {
            return false;
        } else {
            return true;
        }
    })
}

const like = (userGuid, articleGuid) => {

    let createdAt = Strings.formatDate();
    let sql = "INSERT INTO t_like SET ArticleGuid=?, UserGuid=?, CreatedAt=?";

    return query.execute({
        statement: sql,
        params: [articleGuid, userGuid, createdAt]
    }).then(rs => {
        if (rs.affectedRows === 1) {
            return rs.affectedRows;
        } else {
            throw new Error(rs.message);
        }
    })
}

const dislike = (userGuid, articleGuid) => {
    let sql = "DELETE FROM t_like WHERE ArticleGuid=?, UserGuid=?";

    return query.execute({
        statement: sql,
        params: [articleGuid, userGuid]
    }).then(rs => {
        if (rs.affectedRows === 1) {
            return rs.affectedRows;
        } else {
            throw new Error(rs.message);
        }
    })
}

const getLikes = (articleGuid) => {
    let sql = "SELECT UserGuid FROM t_like WHERE ArticleGuid=?";
    
    return query.execute({
        statement: sql,
        params: [articleGuid]
    }).then(rs => {
        if (_.isEmpty(rs)) {
            return [];
        } else {
            return rs;
        }
    })
}

module.exports.likeModel = {
    like,
    liked,
    dislike,
}