const router = require("express").Router();

router.use("/", require("./article"));
router.use("/comment", require("./"))
router.use("/like", require("./like"));
router.use("./collect", require("./collect"));

module.exports = router;