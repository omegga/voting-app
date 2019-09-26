const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	value: {
		type: String,
		required: true
	}
});
answerSchema.set("toJSON", {
	virtuals: true
});

const voteSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	answerId: mongoose.Schema.Types.ObjectId
});

const pollSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	question: {
		type: String,
		required: true
	},
	answers: [answerSchema],
	votes: [voteSchema]
});
pollSchema.set("toJSON", {
	virtuals: true
});

module.exports = mongoose.model("Poll", pollSchema);
