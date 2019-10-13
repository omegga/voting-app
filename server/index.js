const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const loadApp = require("./app");

dotenv.config();

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, 
	{ 
		useNewUrlParser: true, 
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => console.log("connected to db"))
	.catch(() => console.log("error connecting to db"))
	.then(() => {
		console.log("loading api server");
		const app = express();
		loadApp(app);
		const PORT = process.env.PORT;
		app.listen(PORT, () => console.log(`listening on port ${PORT}`));
	})
	.catch(e => console.log(e));
