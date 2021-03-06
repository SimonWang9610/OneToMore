const router = require("express").Router();
const { commentLogic } = require("../../logics/article/comment");
const Response = require("../../utils/response");

router.get("/:articleGuid", async (req, res, next) => {
    let articleGuid = req.params.articleGuid;

    return commentLogic.getComments(articleGuid).then(comments => {
        if (comments) {
            return res.status(200).json({
                Success: true,
                Comments: comments
            })
        } else {
            return Response(res, false, "NoComments");
        }
    }).catch(err => console.error(err))
});

router.get("/count/:articleGuid", async (req, res, next) => {
    let articleGuid = req.params.articleGuid;

    return commentLogic.count(articleGuid).then(count => {
        if (count) {
            return res.status(200).json({
                Success: true,
                Count: count,
            });
        } else {
            return Response(res, false, "NoComments");
        }
    }).catch(err => console.error(err));
})

router.get("/:articleGuid/:commentGuid", async (req, res, next) => {
    // TODO: implement reply comments
    return Response(res, false, "WaitingImplementation");
});


router.post("/create", async (req, res, next) => {
    let comment = req.body;
    console.log("comment: " + JSON.stringify(comment));
    // comment {content, author, articleGuid}

    if (req.token) {
        try {
            let { affectedRows, id } = await commentLogic.addComment(comment, req.userGuid);

            if (affectedRows) {
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

router.delete("/:commentGuid", async (req, res, next) => {
    let commentGuid = req.params.commentGuid;

    if (req.token) {
        return commentLogic.deleteComment(commentGuid, req.userGuid).then(rowsAffected => {
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