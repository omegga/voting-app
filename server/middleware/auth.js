const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
	try {
		const authorizationPrefix = "bearer ";
		const authorization = req.get("authorization");
		const token = authorization.slice(authorizationPrefix.length);
		if (!token) {
			return res.status(401).json({
				error: "invalid request"
			});
		}
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = {
			id: decodedToken.id,
			username: decodedToken.username
		};
		next();
	} catch (exception) {
		console.log(exception);
		res.status(401).json({
			error: "invalid request"
		});
	}
}

module.exports = authMiddleware;
