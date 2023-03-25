const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		requried: true,
		unique: true,
	},
	password: {
		type: String,
		requried: true,
	},
});

module.exports = mongoose.model("User", userSchema);
