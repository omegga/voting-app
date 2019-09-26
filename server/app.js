const path = require("path");
const express = require("express");
const usersRoute = require("./users/usersRoute");
const loginRoute = require("./login/loginRoute");
const pollsRoute = require("./polls/pollsRoute");
const authRoute = require("./auth/authRoute");

function loadApp(app) {
	app.use(express.json());
	function requestLogger(req, res, next) {
		console.log(req.method, req.url);
		next();
	}
	app.use(requestLogger);
	usersRoute(app);
	loginRoute(app);
	pollsRoute(app);
	authRoute(app);
	app.use(express.static(path.join(__dirname, "../build")));
	const indexHtmlFile = path.join(__dirname, "../build/index.html");
	app.use("*", (req, res) => {
		res.sendFile(indexHtmlFile);
	});
	app.use(function errorHandler(error, req, res, next) {
		console.error("error.name", error.name);
		console.error("error.message", error.message);
		if (error.name === "TokenExpiredError") {
			return res.status(401).json({ error: "token expired" });
		}
		if (error.name === "JsonWebTokenError") {
			return res.status(401).json({ error: "invalid token" });
		}
		next(error);
	});
}

module.exports = loadApp;