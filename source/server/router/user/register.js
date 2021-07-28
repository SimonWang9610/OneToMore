const router = require("express").Router();
const { userLogic } = require("../../logics/user");
const Response = require("../../utils/response");

router.post("/", async (req, res, next) => {

    // TODO email verification

    let payload = req.body;
    let email = payload.email;
    let username = payload.username;
    let password = payload.password;

    if (!email || !username || !password) {
        return Response(res, false, "BadRequest");
    }

    try {
        let user = {
            Username: username,
            Email: email,
            Password: password,
        };

        let userId = await userLogic.createUser(user);

        if (userId) {
            return Response(res, true, "SignupSuccess");
        } else {
            return Response(res, false, "SystemError");
        }
    } catch (err) {
        console.error(err);
    }
});

router.get("/verify", async (req, res, next) => {
    let email = req.query.email;
    let username = req.query.username;

    try {
        if (email) {
            let emailExist = await userLogic.emailExist(email);
            return Response(res, true, emailExist);
        }
    
        if (username) {
            let nameExist = await userLogic.nameExist(username);
            return Response(res, true, nameExist);
        }
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;