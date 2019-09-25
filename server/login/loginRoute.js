const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../users/usersModel");

function loginRoute(app) {
	app.post("/api/login", async (req, res) => {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const correctPassword = await bcrypt.compare(password, user.passwordHash);
		if (!user || !correctPassword) {
			return res.status(401).send();
		}
		const token = jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: 60 });
		res.json({ username, token });
	});
}

module.exports = loginRoute;