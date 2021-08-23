const config = require("config");
const jwt = require("jsonwebtoken");
const Promise = require("bluebird");
const Response = require("../utils/response");

const auth = (req, res, next) => {
    let token = req.headers["token"];

    if (token) {
        return validateJWT(req, res, next, token);
    } else {
        next();
    }
}

const validateJWT = (req, res, next, token) => {
    let secretBase64 = Buffer.from(config.jwt.secret).toString("base64");

    return Promise.try(() => jwt.verify(token, secretBase64)).then(decoded => {
        console.log(decoded);
        req.userGuid = decoded.id;
        req.username = decoded.username;
        req.token = token;
        next();
    }).catch(err => {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(408).json({
                Success: false,
                Message: "SessionExpired"
            })
        } else {
            return res.status(401).json({
                Success: false,
                Message: "InvalidCredential"
            })
        }
    })
}

module.exports = auth;