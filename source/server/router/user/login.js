const router = require("express").Router();
const { userLogic } = require("../../logics/user");
const Strings = require("../../utils/String");
const Response = require("../../utils/response");
const config = require("config");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res, next) => {
    
    // read data from the client-side
    let payload = req.body;
    let email = payload.Email;
    let username = payload.Username;
    let password = payload.Password;

    // ensure non-nullable fields
    if (Strings.isNullOrEmpty(email) || Strings.isNullOrEmpty(password)) {
        return Response(res, false, "BadRequest");
    }

    try {
        // validate credentials in the database
        let user = await userLogic.validateCredentials(email, password);

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
                Success: true,
                Message: "LoginSuccess",
                Token: token,
                User: user,
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