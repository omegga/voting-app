const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true 
	},
	passwordHash: String
});
userSchema.set("toJSON", {
	transform: (doc, ret) => {
		delete ret._id;
		delete ret.passwordHash;
		delete ret.__v;
	}
});

module.exports = mongoose.model("User", userSchema);
