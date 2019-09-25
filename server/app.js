const path = require("path");
const express = require("express");
const usersRoute = require("./users/usersRoute");
const loginRoute = require("./login/loginRoute");

function loadApp(app) {
	app.use(express.json());
	function requestLogger(req, res, next) {
		console.log(req.method, req.url);
		next();
	}
	app.use(requestLogger);
	usersRoute(app);
	loginRoute(app);
	app.use(express.static(path.join(__dirname, "../build")));
	const indexHtmlFile = path.join(__dirname, "../build/index.html");
	app.use("*", (req, res) => {
		res.sendFile(indexHtmlFile);
	});
}

module.exports = loadApp;