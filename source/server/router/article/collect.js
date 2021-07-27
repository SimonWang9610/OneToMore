const router = require("express").Router();
const { collectLogic } = require("../../logics/article");
const Response = require("../../utils/response");


router.get("/", async (req, res, next) => {
    let category = req.query.category;

    if (req.token) {
        let articles = await collectLogic.getCollections(req.username, category);
        if (articles) {
            return res.status(200).json({
                data: {
                    success: true,
                    articles: articles,
                }
            })
        } else {
            return Response(res, false, "NoCollections");
        }
    } else {
        return Response(res, false, "NoIdentity");
    }


});
router.get("/:articleGuid", async (req, res, next) => {
    let articleGuid = req.params.articleGuid;

    if (req.token) {
        return collectLogic.collected(req.username, articleGuid).then(row => {
            if (row) {
                return Response(res, true, "Collected");
            } else {
                return Response(res, false, "Uncollected")
            }
        }).catch(err => console.error(err));
    } else {
        return Response(res, false, "Uncollected");
    }
});

router.post("/:articleGuid", async (req, res, next) => {
    let articleGuid = req.params.articleGuid;
    let category = req.query.category;

    if (req.token) {
        return collectLogic.collect(req.username, articleGuid, category).then(rowsAffected => {
            if (rowsAffected) {
                return Response(res, true, "Collected");
            } else {
                return Response(res, false, "CollectFailure");
            }
        }).catch(err => console.error(err));
    } else {
        return Response(res, false, "NoIdentity");
    }
});

router.post("/remove/:articleGuid", async (req, res, next) => {
    let articleGuid = req.params.articleGuid;

    if (req.token) {
        return collectLogic.remove(req.username, articleGuid).then(rowsAffected => {
            if (rowsAffected) {
                return Response(res, true, "Uncollected");
            } else {
                return Response(res, false, "NeverCollected");
            }
        }).catch(err => console.error(err));
    } else {
        return Response(res, false, "NoIdentity");
    }
})