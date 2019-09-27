const express = require("express");
const Poll = require("./pollsModel");
const authMiddleWare = require("../../middleware/auth");

const router = express.Router();
router.route("/")
	.get(async (req, res) => {
		const polls = await Poll.find({});
		res.status(200).json(polls);
	})
	.post(authMiddleWare, async (req, res, next) => {
		const { question, answers } = req.body;
		try {
			const poll = new Poll({
				author: req.user.id,
				question,
				answers
			});
			const savedPoll = await poll.save();
			res.status(200).json(savedPoll);
		} catch (exception) {
			next(exception);
		}
	});
router.get("/:id", async (req, res) => {
	const poll = await Poll.findById(req.params.id).populate("author");
	return res.status(200).json(poll);
});
router.put("/vote", async (req, res, next) => {
	const { pollId, answerId } = req.body;
	try {
		const poll = await Poll.findById(pollId);
		poll.votes.push({
			answerId
		});
		const savedPoll = await poll.save();
		res.status(200).json(savedPoll);
	} catch (exception) {
		next(exception);
	}
});

module.exports = router;
