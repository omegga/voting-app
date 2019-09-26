const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../users/usersModel");

function loginRoute(app) {
	app.post("/api/login", async (req, res, next) => {
		const { username, password } = req.body;
		try {
			const user = await User.findOne({ username });
			if (!user) {
				return res.status(401).json({ error: "wrong credentials" });
			}
			const correctPassword = await bcrypt.compare(password, user.passwordHash);
			if (!correctPassword) {
				return res.status(401).json({ error: "wrong credentials" });
			}
			const token = jwt.sign(
				{ id: user.id, username: user.username }, 
				process.env.TOKEN_SECRET, 
				{ expiresIn: "1h" }
			);
			res.status(200).json({ username, token });
		} catch (exception) {
			next(exception);
		}
	});
}

module.exports = loginRoute;
