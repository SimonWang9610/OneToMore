const router = require("express").Router();
const { userLogic } = require("../../logics/user");
const Response = require("../../utils/response");

router.post("/", async (req, res, next) => {

    // TODO email verification
    console.log("get register request");

    let payload = req.body;
    let email = payload.Email;
    let username = payload.Username;
    let password = payload.Password;

    if (!email || !username || !password) {
        return Response(res, false, "BadRequest");
    }

    try {
        let user = {
            Username: username,
            Email: email,
            Password: password,
        };

        console.log("user: " + JSON.stringify(user));
        // generate required fields, and then store it into database
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
    // to verify if email or name exists in the system
    let email = req.body.Email;
    let username = req.body.Username;

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