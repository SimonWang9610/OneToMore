// group a batch of assets into a page
const config = require('config');
module.exports = function() {
	return function(req, res, next) {
		if (req.query.page) {
			let offset = config.pagination.perPage;
			let page = parseInt(req.query.page, 10);
			let from = (page - 1) * offset;
			req.query.offset = offset;
			req.query.from = from;

			next();
		} else {
			next();
		}
	};
};
