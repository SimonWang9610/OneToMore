const _ = require("loadsh");
const query = require("../../models/query");
const Strings = require('../../utils/String');

const getCollections = (userGuid, category) => {

    let sql = "SELECT a.Guid, a.Title, a.Author, a.Category, a.LastModified, a.ViewsCount, Liked FROM t_article a " +
        "LEFT JOIN (SELECT ArticleGuid, COUNT(Guid) as CommentsCount FROM t_comment GROUP BY ArticleGuid) AS ac ON ac.ArticleGuid = a.Guid " +
        "LEFT JOIN t_collection tc ON a.Guid = tc.ArticleGuid " +
        "LEFT JOIN (SELECT ArticleGuid, UserGuid, COUNT(ID) as Liked FROM t_like GROUP BY UserGuid) AS al ON al.UserGuid = tc.Guid AND al.ArticleGuid = tc.ArticleGuid WHERE tc.Guid=?";
    
    let params = [userGuid];

    if (category) {
        sql.concat(" AND tc.Category=?");
        params.push(category);
    }

    return query.execute({
        statement: sql,
        params: params,
    }).then(rs => {
        console.log("rs" + rs);
        if (_.isEmpty(rs)) {
            return [];
        } else {
            return rs;
        }
    })
}

const collected = (userGuid, articleGuid) => {
    let sql = "SELECT COUNT(ID) AS Count FROM t_collection WHERE Guid=? AND ArticleGuid=?";

    return query.execute({
        statement: sql,
        params: [userGuid, articleGuid]
    }).then(rs => {
        return rs[0].Count;
    });
}

const collect = (userGuid, articleGuid, category) => {
    let createdAt = Strings.formatDate();

    let sql = "INSERT INTO t_collection SET Guid=?, ArticleGuid=?, CreatedAt=? ";
    let params = [userGuid, articleGuid, createdAt];

    if (category) {
        sql.concat(", Category=?");
        params.push(category);
    }

    return query.execute({
        statement: sql,
        params: params,
    }).then(rs => {
        if (rs.affectedRows === 1) {
            return true;
        } else {
            throw new Error(rs.message);
        }
    });
}

const remove = (userGuid, articleGuid) => {
    let sql = "DELETE FROM t_collection WHERE Guid=?, ArticleGuid=?";

    return query.execute({
        statement: sql,
        params: [userGuid, articleGuid]
    }).then(rs => {
        if (rs.affectedRows === 1) {
            return true;
        } else {
            throw new Error(rs.message);
        }
    })
}

module.exports.collectModel = {
    getCollections,
    collect,
    collected,
    remove,
}