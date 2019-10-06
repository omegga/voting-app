const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./usersModel");
const Poll = require("../polls/pollsModel");
const authMiddleware = require("../../middleware/auth");
const { notifySignupMiddleware } = require("../../middleware/notify");

const SALT_ROUNDS = 10;

const router = express.Router();
router.get("/:id/polls", authMiddleware, [
	function verifyUser(req, res, next) {
		if (req.user.id !== req.params.id) {
			return res.sendStatus(401);
		}
		next();
	},
	async function sendUserPolls(req, res, next) {
		try {
			const polls = await Poll.find({ author: req.user.id });
			return res.status(200).json(polls);
		}	catch (exception) {
			next(exception);
		}
	}
]);
router.route("/")
	.get(async (req, res, next) => {
		try {
			const users = await User.find({});
			res.json(users);
		} catch (err) {
			next(err);
		}
	})
	.post(
		async (req, res, next) => {
			const { username, password } = req.body;
			try {
				const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
				const newUser = new User({
					username,
					passwordHash
				});
				const savedUser = await newUser.save();
				res.json(savedUser);
				next();
			} catch (err) {
				next(err);
			}
		},
		notifySignupMiddleware
	);

module.exports = router;
