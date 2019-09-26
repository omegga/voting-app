const bcrypt = require("bcrypt");
const User = require("./usersModel");
const Poll = require("../polls/pollsModel");
const authMiddleware = require("../middleware/auth");

function usersRoute(app) {
	app.get("/api/users/polls", authMiddleware, async (req, res, next) => {
		try {
			const polls = await Poll.find({ author: req.user.id });
			return res.status(200).json(polls);
		}	catch (exception) {
			next(exception);
		}
	});
	app.get("/api/users", async (req, res, next) => {
		try {
			const users = await User.find({});
			res.json(users);
		} catch (err) {
			next(err);
		}
	});
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
