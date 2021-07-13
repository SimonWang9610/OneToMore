//concat the complete API for retrieving assets from vault
module.exports = function (req, res, next) {
	let url = req.url;
	if (!url.startsWith('/api') && url != '/') {
		let prefix = '/api/v1';

		if (url.startsWith('/images') || url.startsWith('/videos') || url.startsWith('/temp')) {
			prefix += '/vault';
		}
		req.url = prefix + url;
	}
	console.log('module.exports.completeApi -> req.url', req.url);

	next();
};
