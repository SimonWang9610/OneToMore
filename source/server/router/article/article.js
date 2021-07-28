const router = require('express').Router();
const config = require('config');
const { articleLogic } = require('../../logics/article/article');
const pagination = require('../../middleware/pagination');
const Response = require("../../utils/response");
const fileLogic = require("../../logics/file-logic");

// redirect to new page 'article-editor.html'
router.get('/', pagination(), async (req, res, next) => {
    // TODO: test (skip, limit) features for pagination

	let skip = req.query.skip;
	let limit = req.query.limit;

	try {
		let articles = await articleLogic.getArticles(skip, limit);
		
		return res.status(200).json({
			data: {
                success: true,
				articles: articles
			},
			error: null,
		});
	} catch (err) {
        console.error(err);
	}
});

router.get('/:id', async (req, res, next) => {
	
	let articleGuid = req.params.id;
	
	try {
		let article = await articleLogic.getSingleArticle(articleGuid);

		console.log(article);

		if (article) {
			return res.status(200).json({
				data: {
					success: true,
					article: article,
				},
				error: null,
			});
		} else {
            return Response(res, false, "ArticleNotExist");
		}

	} catch (err) {
        console.error(err);
	}
});

router.post('/edit/:id', (req, res, next) => {
	// TODO: handle existing articles that contain images or videos
	let articleGuid = req.params.id;
	let payload = req.body;

    let article = payload.article;
    article.Guid = articleGuid;

    console.log('article', article);
    
    if (req.token) {
        return articleLogic
		.editArticle(article)
		.then((rowsAffected) => {
			if (rowsAffected) {
				// fileLogic.saveFiles(articleGuid, payload.files).then((affectedRows) => {
				// 	console.log(' insert images affectedRows', affectedRows);
				// 	return Utils.resp(res, true, 'ArticleEdited');
				// });
				// res.redirect(`/api/v1/article/${articleGuid}`);
			} else {
                return Response(res, false, "EditFailure");
			}
		})
		.catch((err) => console.error(err));
    } else {
        return Response(res, false, "Unauthorization");
    }
	
});

router.post('/create', async (req, res, next) => {

	let payload = req.body;
	let newArticle = payload.article;
	console.log(newArticle);
	
    if (req.token) {
        newArticle.Author = req.username;
        console.log(newArticle);
        return articleLogic.createArticle(newArticle).then((results) => {
            if (results.affectedRows) {
                // fileLogic
                // 	.saveFiles(results.id, payload.files)
                // 	.then((affectedRows) => {
                // 		return Utils.resp(res, true, 'ArticleCreated!');
                // 	})
                // 	.catch((err) => {
                // 		console.log(err);
                // 	});
                return res.status(200).json({
                    data: {
                        success: true,
                    },
                    error: null,
                });
            } else {
                return Response(res, false, "CreationFailure");
            }
        }).catch(err => {
            console.error(err);
        });
    } else {
        return Response(res, false, "Unauthorization");
    }

});

router.post('/view/:id', async (req, res, next) => {
    let articleGuid = req.params.id;
    
    if (req.token) {
        try {
            await articleLogic.increaseViewsCount(articleGuid).then((rowsAffected) => {
                if (rowsAffected) {
                    return Response(res, true, null);
                } else {
                    return Response(res, false, "ViewFailure");
                }
            });
        } catch (err) {
            console.error(err);
        }
    } else {
        return Response(res, false, "Unauthorization");
    }
});


router.delete('/:id', (req, res, next) => {
	let articleGuid = req.params.id;

    if (req.token) {
        return articleLogic.deleteArticle(articleGuid).then((rowsAffected) => {
            if (rowsAffected) {
                return Response(res, true, null);
            } else {
                return Response(res, false, "DeleteFailure");
            }
        });
    } else {
        return Response(res, false, "Unauthorization");
    }
});
/* return articleLogic
		.deleteArticle(articleGuid)
		.then((results) => {
			if (results.affectedRows) {
				fileLogic.deleteFiles(results.id).then((affectedRows) => {
					return Utils.resp(res, true, 'ArticleDeleted');
				});
			} else {
				return Utils.resp(res, false, 'FailedDeleteArticle');
			}
		})
		.catch((err) => {
			console.log(err);
		});
}); */

module.exports = router;
