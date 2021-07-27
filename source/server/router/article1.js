const router = require('express').Router();
const config = require('config');
const articleLogic = require('../logics/article');
const pagination = require('../middleware/pagination');
const Utils = require('../utils/Utils');

// redirect to new page 'article-editor.html'
router.get('/', pagination(), async (req, res, next) => {
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
		res.status(500).json({
			data: {
				success: false
			},
			error: err,
		});
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
			throw new Error("Not Found Article");
		}

	} catch (err) {
		console.log(err);
		return res.json({
			data: {
				success: false,
			},
			error: err,
		});
	}
});

router.post('/edit/:id', (req, res, next) => {
	// TODO: handle existing articles that contain images or videos
	let articleGuid = req.params.id;
	let payload = req.body;

	let article = payload.article;

	console.log('article', article);
	
	article.Guid = articleGuid;

	return articleLogic
		.editArticle(article)
		.then((rowsAffected) => {
			if (rowsAffected) {
				// fileLogic.saveFiles(articleGuid, payload.files).then((affectedRows) => {
				// 	console.log(' insert images affectedRows', affectedRows);
				// 	return Utils.resp(res, true, 'ArticleEdited');
				// });
				res.redirect(`/api/v1/article/${articleGuid}`);
			} else {
				throw new Error("Failed to Edit");
			}
		})
		.catch((err) => {
			console.log(err);
			return res.json({
				data: {
					success: false,
				},
				error: err,
			})
		});
});

router.post('/create', (req, res, next) => {

	let payload = req.body;
	let newArticle = payload.article;
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
					created: true,
				},
				error: null,
			});
		} else {
			throw new Error("Failed to Create");
		}
	}).catch(err => {
		return res.json({
			data: {
				success: false,
			},
			error: err,
		})
	});
});

router.post('/view/:id', async (req, res, next) => {
	let articleGuid = req.params.id;

	try {
		await articleLogic.increaseViewsCount(articleGuid).then((rowsAffected) => {
			if (rowsAffected) {
				return res.status(200).json({
					data: {
						success: true
					},
					error: null,
				})
			} else {
				throw new Error("Invalid visit");
			}
		});
	} catch (err) {
		return res.json({
			data: {
				success: false,
			},
			error: err,
		})
	}
});


router.delete('/:id', (req, res, next) => {
	let articleGuid = req.params.id;

	return articleLogic.deleteArticle(articleGuid).then((rowsAffected) => {
		if (rowsAffected) {
			return res.status(200).json({
				data: {

				}
			})
		} else {
			return Utils.resp(res, false, 'FailedDeleteArticle');
		}
	});

	// return fileLogic
	// 	.deleteFiles(articleGuid)
	// 	.then((affectedRows) => {
	// 		return articleLogic.deleteArticle(articleGuid).then((results) => {
	// 			if (affectedRows) {
	// 				return Utils.resp(res, true, 'ArticleDeleted');
	// 			} else {
	// 				return Utils.resp(res, false, 'FailedDeleteArticle');
	// 			}
	// 		});
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
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
