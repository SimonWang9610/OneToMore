const router = require('express').Router();
const config = require('config');
const { articleLogic } = require('../../logics/article/article');
const pagination = require('../../middleware/pagination');
const Response = require("../../utils/response");
const fileLogic = require("../../logics/file-logic");


/*
@return {Guid, Title, Author, LastModified, Category, ViewsCount, LikesCount, CommentsCount, CollectsCount}
*/
router.get('/', pagination(), async (req, res, next) => {

	// let skip = req.query.skip;
	// let limit = req.query.limit;

    try {
        // get the [limit] articles starting from [skip]
        // TODO: test (skip, limit) features for pagination
		let articles = await articleLogic.getArticles();
        if (articles) {
            return res.status(200).json({
                Success: true,
                Articles: articles
            });
        } else {
            return Response(res, false, NoArticle);
        }
	} catch (err) {
        console.error(err);
	}
});

/*
@return {Guid, Title, Content, Author, CreatedAt, LastModified, Category, ViewsCount, LikesCount, CommentsCount, CollectsCount}
*/
router.get('/:id', async (req, res, next) => {
	
	let articleGuid = req.params.id;
	
    try {
		let article = await articleLogic.getSingleArticle(articleGuid);

		console.log(article);

		if (article) {
			return res.status(200).json({
                Success: true,
                Article: article,
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

    let newArticle = req.body;
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
                    Success: true,
                    Message: "Published"
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
