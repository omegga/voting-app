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
		ref: "User",
		required: true
	},
	question: {
		type: String,
		required: true
	},
	answers: {
		type: [answerSchema],
		required: true,
		validate: function(val) {
			return val.length >= 2;
		}
	},
	votes: [voteSchema]
});
pollSchema.set("toJSON", {
	virtuals: true
});

module.exports = mongoose.model("Poll", pollSchema);
