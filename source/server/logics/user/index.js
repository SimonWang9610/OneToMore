const { userModel } = require("../../models/user");
const Utils = require("../../utils/Utils");
const config = require("config");
const Strings = require("../../utils/String");

const validateCredentials = (username, password) => {
    return userModel.getUser(username).then(user => {
        if (user && isPasswordEqual(password, user)) {
            delete user.Password;
            delete user.SaltKey;
            return user;
        } else {
            return null;
        }
    });
}

const updateLastLogin = (userGuid) => {
    let date = Strings.formatDate();
    return userModel.updateLastLogin(userGuid, date);
}

const createUser = async (user) => {
    // generate SaltKey for hashing the user password
    // and then compare the hashedPassword saved in the database
    let passwordSalt = Utils.createSaltKey(config.password.saltKeyLength);
    let hashedPassword = Utils.createHashPassword(user.password, passwordSalt, config.password.hashAlgorithm);

    user.Guid = Utils.uuid();
    user.Password = hashedPassword;
    user.SaltKey = passwordSalt;

    try {
        // store the user information in the database
        let affectedRows = await userModel.createUser(user);

        if (affectedRows) {
            // remove secret fields to avoid exposing important information
            delete user.Password;
            delete user.SaltKey;
            return user.Guid;
        } else {
            return 0;
        }
    } catch (err) {
        console.error(err);
    }
}

const emailExist = (email) => {
    return userModel.emailExist(email);
}

const nameExist = (name) => {
    return userModel.nameExist(name);
}

function isPasswordEqual(password, user) {
    let savedPassword = Utils.createHashPassword(password, user.SaltKey, config.password.hashAlgorithm);

    if (savedPassword != user.password) {
        return true;
    }

    return false;
}

module.exports.userLogic = {
    validateCredentials,
    updateLastLogin,
    createUser,
    emailExist,
    nameExist,
}