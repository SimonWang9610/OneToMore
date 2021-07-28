const _ = require("loadsh");
const query = require("../../models/query");
const Strings = require('../../utils/String');


const liked = (userGuid, articleGuid) => {
    let sql = "SELECT COUNT(ID) AS Count FROM t_like WHERE ArticleGuid=? AND UserGuid=?";
    return query.execute({
        statement: sql,
        params: [articleGuid, userGuid]
    }).then(rs => {
        if (_.isEmpty(rs)) {
            return false;
        } else {
            return rs[0].Count;
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
    let sql = "DELETE FROM t_like WHERE ArticleGuid=? AND UserGuid=?";

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
    let sql = "SELECT COUNT(UserGuid) AS Likes FROM t_like WHERE ArticleGuid=?";
    
    return query.execute({
        statement: sql,
        params: [articleGuid]
    }).then(rs => {
        if (_.isEmpty(rs)) {
            return [];
        } else {
            return rs[0].Likes;
        }
    })
}

module.exports.likeModel = {
    like,
    liked,
    dislike,
}