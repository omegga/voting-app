const path = require("path");
const express = require("express");
const apiRouter = require("./api/apiRouter");


function logErrors(error, req, res, next) {
	console.error("error.name", error.name);
	console.error("error.message", error.message);
	console.error("error.stack", error.stack);
	next(error);
}

function jwtErrorsHandler(error, req, res, next) {
	if (error.name === "TokenExpiredError") {
		return res.status(401).json({ error: "token expired" });
	}
	if (error.name === "JsonWebTokenError") {
		return res.status(401).json({ error: "invalid token" });
	}
	next(error);
}

function requestLogger(req, res, next) {
	console.log(req.method, req.url);
	next();
}

function loadApp(app) {
	app.use(express.json());
	app.use(requestLogger);
	app.use("/api", apiRouter);
	app.use(express.static(path.join(__dirname, "../build")));
	const indexHtmlFile = path.join(__dirname, "../build/index.html");
	app.use("*", (req, res) => {
		res.sendFile(indexHtmlFile);
	});
	app.use(logErrors);
	app.use(jwtErrorsHandler);
}

module.exports = loadApp;
