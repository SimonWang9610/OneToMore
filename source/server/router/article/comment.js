const router = require("express").Router();
const { commentLogic } = require("../../logics/article");
const Response = require("../../utils/response");

router.get("/:articleGuid/", async (req, res, next) => {
    let articleGuid = req.params.articleGuid;

    return commentLogic.getComments(articleGuid).then(comments => {
        if (comments) {
            return res.status(200).json({
                data: {
                    success: true,
                    comments: comments
                }
            })
        } else {
            return Response(res, false, "NoComments");
        }
    }).catch(err => console.error(err))
});

router.get("/:articleGuid/:commentGuid", async (res, res, next) => {
    // TODO: implement reply comments
    return Response(res, false, "WaitingImplementation");
});


router.post("/create", async (req, res, next) => {
    let comment = req.payload.comment;
    
    if (req.token) {
        try {
            let { rowsAffected, id } = await commentLogic.addComment(comment);
    
            if (rowsAffected) {
                let comment = await commentLogic.getComment(id);
                return Response(res, true, comment);
            } else {
                return Response(res, false, "CommentFailure");
            }
        } catch (err) {
            console.error(err);
        }
    } else {
        Response(res, false, "Unauthorization");
    }
});

router.post("/delete/:commentGuid", async (req, res, next) => {
    let commentGuid = req.params.commentGuid;

    if (req.token) {
        return commentLogic.deleteComment(commentGuid).then(rowsAffected => {
            if (rowsAffected) {
                return Response(res, true, null);
            } else {
                return Response(res, false, "DeleteCommentFailure");
            }
        }).catch(err => {
            console.error(err);
        })
    } else {
        return Response(res, false, "Unauthorization");
    }

})

module.exports = router;