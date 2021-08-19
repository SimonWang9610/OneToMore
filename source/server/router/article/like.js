const router = require("express").Router();
const { likeLogic } = require("../../logics/article/like");
const Response = require("../../utils/response");

router.get("/:articleGuid", async (req, res, next) => {
    let articleGuid = req.params.articleGuid;

    if (req.token) {
        return likeLogic.liked(req.userGuid, articleGuid).then(row => {
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
        return likeLogic.like(req.userGuid, articleGuid).then(row => {
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

router.delete("/:articleGuid", async (req, res, next) => {
    let articleGuid = req.params.articleGuid;

    if (req.token) {
        return likeLogic.dislike(req.userGuid, articleGuid).then(rowsAffected => {
            if (rowsAffected) {
                return Response(res, false, "Disliked");
            } else {
                return Response(res, false, "NeverLiked");
            }
        }).catch(err => console.error(err));
    } else {
        return Response(res, false, "NoIdentity");
    }
});

module.exports = router;