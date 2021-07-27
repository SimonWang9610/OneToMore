// group a batch of assets into a page
const config = require('config');
module.exports = function() {
	return function(req, res, next) {
		if (req.query.page) {
			let page = parseInt(req.query.page, 10);
			let skip = (page - 1) * config.pagination.perPage;
			req.query.skip = skip;
			req.query.limit = config.pagination.perPage;

			next();
		} else {
			next();
		}
	};
};
