const express = require("express");
const Poll = require("./pollsModel");
const authMiddleWare = require("../../middleware/auth");

const router = express.Router();
router.route("/")
	.get(async function getPolls(req, res) {
		const polls = await Poll.find({});
		res.status(200).json(polls);
	})
	.post(authMiddleWare, async function createPoll(req, res, next) {
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
router.post("/:id/auth", authMiddleWare, async function verifyUser(req, res, next) {
	try {
		const pollId = req.params.id;
		const userId = req.user.id;
		const poll = await Poll.findById(pollId);
		if (!poll.author.equals(userId)) { // poll.author is an object while userId is a string
			return res.sendStatus(401);
		}
		return res.status(200).json(poll);
	} catch (exception) {
		next(exception);
	}
});
router.route("/:id")
	.get(async function getPoll(req, res) {
		const pollId = req.params.id;
		const poll = await Poll.findById(pollId).populate("author");
		if (poll === null) {
			return res.sendStatus(404);
		}
		return res.status(200).json(poll);
	})
	.put(authMiddleWare, async function editPoll(req, res, next) {
		try {
			const pollId = req.params.id;
			const newAnswers = req.body.answers;
			const userId = req.user.id;
			const poll = await Poll.findById(pollId).populate("author");
			if (!poll.author.equals(userId)) {
				return res.sendStatus(401);
			}
			newAnswers.forEach(answer => poll.answers.push(answer));
			const savedPoll = await poll.save();
			return res.status(200).json(savedPoll);
		} catch (exception) {
			next(exception);
		}
	})
	.delete(authMiddleWare, async function deletePoll(req, res, next) {
		try {
			const pollId = req.params.id;
			const userId = req.user.id;
			const poll = await Poll.findById(pollId).populate("author");
			if (!poll.author.equals(userId)) {
				return res.sendStatus(401);
			}
			await Poll.deleteOne({ _id: pollId });
			return res.sendStatus(200);
		} catch (exception) {
			next(exception);
		}
	});
router.put("/:id/vote", async function addVoteToPoll(req, res, next) {
	const pollId = req.params.id;
	const answerId = req.body.answerId;
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
