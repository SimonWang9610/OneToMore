const router = require('express').Router();
const config = require('config');
const articleLogic = require('../logics/article-logic');
const fileLogic = require('../logics/file-logic');
const pagination = require('../middleware/pagination');
const Utils = require('../utils/Utils');

// redirect to new page 'article-editor.html'
router.get('/', pagination(), async (req, res, next) => {
	let type = req.query.type;
	let offset = req.query.offset;
	let from = req.query.from;
	let state = req.query.state;

	try {
		let articles = null;

		if (type === 'latest') {
			articles = await articleLogic.getLatestArticle();
		} else {
			let total = null;
			articles = await articleLogic.getArticles(type, from, offset);

			// if not from index 0, pagination does not change
			// therefore no need to query count
			// after first loading page, currentState is aet as 0;
			if (!from && state) {
				let count = await articleLogic.count(type);
				total = Math.ceil(count / config.pagination.perPage);
				articles.push(total);
			}
		}

		return res.status(200).json(articles);
	} catch (err) {
		return res.status(500).json(err);
	}
});

router.get('/:id', async (req, res, next) => {
	let articleGuid = req.params.id;
	try {
		let article = await articleLogic.getSingleArticle(articleGuid);

		console.log(article);

		if (article) {
			return res.status(200).json(article);
		} else {
			return Utils.resp(res, false, 'NotFoundArticle');
		}
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});

router.post('/edit/:id', (req, res, next) => {
	let articleGuid = req.params.id;
	let payload = req.body;

	let article = payload.article;
	console.log('article', article);
	article.Guid = articleGuid;

	return articleLogic
		.editArticle(article)
		.then((rowsAffected) => {
			if (rowsAffected) {
				fileLogic.saveFiles(articleGuid, payload.files).then((affectedRows) => {
					console.log(' insert images affectedRows', affectedRows);
					return Utils.resp(res, true, 'ArticleEdited');
				});
			} else {
				return Utils.resp(res, false, 'FailedEditArticle');
			}
		})
		.catch((err) => {
			console.log(err);
			return res.json(err);
		});
});

router.post('/create', (req, res, next) => {
	let payload = req.body;
	let newArticle = payload.article;
	console.log(newArticle);
	return articleLogic.createArticle(newArticle).then((results) => {
		if (results.affectedRows) {
			fileLogic
				.saveFiles(results.id, payload.files)
				.then((affectedRows) => {
					return Utils.resp(res, true, 'ArticleCreated!');
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return Utils.resp(res, false, 'FailedCreateArticle');
		}
	});
});

router.post('/view/:id', async (req, res, next) => {
	let articleGuid = req.params.id;

	try {
		await articleLogic.increaseViewsCount(articleGuid).then((rowsAffected) => {
			return Utils.resp(res, true, 'OK');
		});
	} catch (err) {
		return Utils.resp(res, false, 'FailedIncreaseViewsCount');
	}
});

router.delete('/:id', (req, res, next) => {
	let articleGuid = req.params.id;

	return fileLogic
		.deleteFiles(articleGuid)
		.then((affectedRows) => {
			return articleLogic.deleteArticle(articleGuid).then((results) => {
				if (affectedRows) {
					return Utils.resp(res, true, 'ArticleDeleted');
				} else {
					return Utils.resp(res, false, 'FailedDeleteArticle');
				}
			});
		})
		.catch((err) => {
			console.log(err);
		});
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
