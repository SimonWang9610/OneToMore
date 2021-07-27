const router = require("express").Router();

router.use("/register", require("./register"));
router.use("/login", require("./login"));

module.exports = router;