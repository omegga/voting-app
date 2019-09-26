const jwt = require("jsonwebtoken");

function authRoute(app) {
	app.post("/api/auth", async (req, res, next) => {
		try {
			const authorizationPrefix = "bearer ";
			const authorization = req.get("authorization");
			const token = authorization.slice(authorizationPrefix.length);
			const { username, id } = await jwt.verify(token, process.env.TOKEN_SECRET);
			res.status(200).json({ id, username });
		} catch (exception) {
			next(exception);
		}
	});
}

module.exports = authRoute;