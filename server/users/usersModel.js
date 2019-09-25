const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true 
	},
	passwordHash: String
});

module.exports = mongoose.model("User", userSchema);
