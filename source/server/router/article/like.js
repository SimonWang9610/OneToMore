const router = require("express").Router();
const { likeLogic } = require("../../logics/article");
const Response = require("../../utils/response");

router.get("/:articleGuid", async (req, res, next) => {
    let articleGuid = req.params.articleGuid;

    if (req.token) {
        return likeLogic.liked(req.username, articleGuid).then(row => {
            if (row) {
                return Response(res, true, "Liked");
            } else {
                Response(res, false, "Disliked");
            }
        }).catch(err => console.error(err));
    } else {
        return Response(res, false, "Disliked");
    }
});

router.post("/:articleGuid", async (req, res, next) => {
    let articleGuid = req.params.articleGuid;

    if (req.token) {
        return likeLogic.like(req.username, articleGuid).then(row => {
            if (row) {
                return Response(res, true, "Liked");
            } else {
                Response(res, false, "LikeFailure");
            }
        }).catch(err => console.error(err));
    } else {
        return Response(res, false, "NoIdentity");
    }
});

router.post("/dislike/:articleGuid", async (req, res, next) => {
    let articleGuid = req.params.articleGuid;

    if (req.token) {
        return likeLogic.dislike(req.username, articleGuid).then(rowsAffected => {
            if (rowsAffected) {
                return Response(res, true, "Disliked");
            } else {
                return Response(res, false, "NeverLiked");
            }
        }).catch(err => console.error(err));
    } else {
        return Response(res, false, "NoIdentity");
    }
});

module.exports = router;