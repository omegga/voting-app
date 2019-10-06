function emailServiceActivatedMiddleware(req, res, next) {
	if (process.env.EMAIL_SERVICE_ACTIVATED !== "true") {
		return;
	}
	next();
}

module.exports = { emailServiceActivatedMiddleware };
