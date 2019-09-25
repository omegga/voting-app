const User = require("./usersModel");
const bcrypt = require("bcrypt");

function usersRoute(app) {
	app.post("/api/users", async (req, res, next) => {
		const { username, password } = req.body;
		try {
			const saltRounds = 10;
			const passwordHash = await bcrypt.hash(password, saltRounds);
			const newUser = new User({
				username,
				passwordHash
			});
			const savedUser = await newUser.save();
			res.json(savedUser);
		} catch (err) {
			next(err);
		}
	});
}

module.exports = usersRoute;