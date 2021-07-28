const router = require("express").Router();
const { userLogic } = require("../../logics/user");
const Strings = require("../../utils/String");
const Response = require("../../utils/response");
const config = require("config");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res, next) => {
    
    // read data from the client-side
    let payload = req.body;
    let email = payload.email;
    let username = payload.username;
    let password = payload.password;


    // ensure non-nullable fields
    if (Strings.isNullOrEmpty(email) || Strings.isNullOrEmpty(password)) {
        return Response(res, false, "BadRequest");
    }

    try {
        // validate credentials in the database
        let user = await userLogic.validateCredentials(username, password);

        if (user) {
            // update the last login date
            let affectedRows = await userLogic.updateLastLogin(user.Guid);
            // create jsonwebtoken for tracking and verifying the user's identity
            // the token could be decoded by the configured system secure key
            // the decoded token includes { userGuid, username }
            let token = createJWT(user);

            res.cookie("OneToken", token);

            // return the public information of the current user: {userGuid, username}
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
    // the message 'Logout' indicates that the client-side should clear the 
    // token stored locally
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