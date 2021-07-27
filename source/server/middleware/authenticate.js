const config = require("config");
const jwt = require("jsonwebtoken");
const Promise = require("bluebird");
const Response = require("../utils/response");

const auth = (req, res, next) => {
    let token = req.headers["Token"];

    if (token) {
        return validateJWT(req, res, next, token);
    } else {
        next();
    }
}

const validateJWT = (req, res, next, token) => {
    let secretBase64 = Buffer.from(config.jwt.secret).toString("base64");

    return Promise.try(() => jwt.verify(token, secretBase64)).then(decoded => {
        req.username = decoded.UserGuid;
        req.token = token;
        next();
    }).catch(err => {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(408).json({
                data: {
                    success: false,
                    message: "SessionExpired"
                },
                error: null,
            })
        } else {
            return res.status(401).json({
                data: {
                    success: false,
                    message: "InvalidCredential"
                }
            })
        }
    })
}

module.exports = auth;