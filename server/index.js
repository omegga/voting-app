const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const loadApp = require("./app");

dotenv.config();
const DB_URL = process.env.NODE_ENV === "production"
	? process.env.DB_URL_PRODUCTION
	: process.env.NODE_ENV === "development"
		? process.env.DB_URL_TEST
		: "";
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("connected to db");
		const app = express();
		loadApp(app);
		const PORT = process.env.PORT;
		app.listen(PORT, () => console.log("listening on port " + PORT));
	})
	.catch(() => {
		console.log("error connecting to db");
	});
