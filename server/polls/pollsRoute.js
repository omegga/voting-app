const Poll = require("./pollsModel");
const authMiddleWare = require("../middleware/auth");

function pollsRoute(app) {
	app.get("/api/polls", async (req, res) => {
		const polls = await Poll.find({});
		res.status(200).json(polls);
	});
	app.get("/api/polls/:id", async (req, res) => {
		const poll = await Poll.findById(req.params.id).populate("author");
		return res.status(200).json(poll);
	});
	app.put("/api/polls/vote", async (req, res, next) => {
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
	app.post("/api/polls", authMiddleWare, async (req, res, next) => {
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
}

module.exports = pollsRoute;
