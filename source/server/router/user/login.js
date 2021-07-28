const router = require("express").Router();
const { userLogic } = require("../../logics/user");
const Strings = require("../../utils/String");
const Response = require("../../utils/response");
const config = require("config");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res, next) => {
    let payload = req.body;
    let email = payload.email;
    let username = payload.username;
    let password = payload.password;

    if (Strings.isNullOrEmpty(email) || Strings.isNullOrEmpty(password)) {
        return Response(res, false, "BadRequest");
    }

    try {
        let user = await userLogic.validateCredentials(username, password);

        if (user) {
            let affectedRows = await userLogic.updateLastLogin(user.Guid);
            let token = createJWT(user);

            res.cookie("OneToken", token);
            return res.status(200).json({
                data: {
                    success: true,
                    message: "LoginSuccess",
                    Token: token,
                    user: user,
                },
                error: null,
            })
        } else {
            return Response(res, false, "UserNotExist");
        }
    } catch (err) {
        console.error(err);
    }
});


router.post("/logout", async (req, res, next) => {
    res.clearCookie("OneToken");
    return Response(res, true, "Logout");
});


const createJWT = (user) => {
    let options = {};

    options.expiresIn = config.jwt.expiresInMinutes;
    options.audience = config.jwt.audience;
    options.issuer = config.jwt.issuer;

    let message = {
        id: user.Guid,
        username: user.Username,
    };

    let secretBase64 = Buffer.from(config.jwt.secret).toString("base64");

    let token = jwt.sign(message, secretBase64, options);

    return token;
}

module.exports = router;