const authMiddleware = require("../middleware/auth");

function authRoute(app) {
	app.post("/api/auth", authMiddleware, (req, res) => {
		res.sendStatus(200);
	});
}

module.exports = authRoute;
