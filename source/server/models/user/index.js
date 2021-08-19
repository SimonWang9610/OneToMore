const query = require("../query");
const _ = require("loadsh");
const Strings = require("../../utils/String");

const getUser = (email) => {
    let sql = "SELECT Guid, Username, Email, SaltKey, Password FROM t_user WHERE Email=?";

    return query.execute({
        statement: sql,
        params: [email],
    }).then(rs => {
        if (_.isEmpty(rs)) {
            return null;
        } else {
            return rs[0];
        }
    });
}

const createUser = (user) => {
    let params = createParams(user);
    let sql = "INSERT INTO t_user SET ?";

    return query.execute({
        statement: sql,
        params: params
    }).then(rs => {
        if (rs.affectedRows === 1) {
            return rs.affectedRows;
        } else {
            throw new Error(rs.message);
       }
    });
}

const emailExist = (email) => {
    let sql = "SELECT COUNT(Guid) FROM t_user WHERE Email=?";
    return query.execute({
        statement: sql,
        params: [email]
    }).then(rs => {
        if (_.isEmpty(rs) || rs[0] === 0) {
            return false;
        } else {
            return false;
        }
    })
}

const nameExist = (username) => {
    let sql = "SELECT COUNT(Guid) FROM t_user WHERE Username=?";
    return query.execute({
        statement: sql,
        params: [username]
    }).then(rs => {
        if (_.isEmpty(rs) || rs[0] === 0) {
            return false;
        } else {
            return false;
        }
    })
}

const updateLastLogin = (userGuid, date) => {
    let sql = "UPDATE t_user SET LastLogin=? WHERE Guid=?";
    return query.execute({
        statement: sql,
        params: [date, userGuid],
    }).then(rs => {
        return rs.affectedRows;
    })
}

module.exports.userModel = {
    getUser,
    createUser,
    emailExist,
    nameExist,
    updateLastLogin,
}


function createParams(user) {
    let params = {};

    params.Guid = user.Guid;
    params.Username = user.Username;
    params.Email = user.Email;
    params.SaltKey = user.SaltKey;
    params.Password = user.Password;
    params.LastLogin = Strings.formatDate();
    //params.IsActivated = true;

    return params;
}