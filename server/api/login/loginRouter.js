const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../users/usersModel");

const router = express.Router();
router.post("/", async function loginUser(req, res, next) {
	const { username, password } = req.body;
	try {
		const fetchedUser = await User.findOne({ username });
		if (!fetchedUser) {
			return res.status(401).json({ error: "wrong credentials" });
		}
		const correctPassword = await bcrypt.compare(password, fetchedUser.passwordHash);
		if (!correctPassword) {
			return res.status(401).json({ error: "wrong credentials" });
		}
		const token = jwt.sign(
			{ id: fetchedUser.id, username: fetchedUser.username }, 
			process.env.TOKEN_SECRET,
			{ expiresIn: process.env.TOKEN_EXPIRATION }
		);
		res.status(200).json({
			id: fetchedUser.id,
			username: fetchedUser.username,
			token 
		});
	} catch (exception) {
		next(exception);
	}
});

module.exports = router;
