const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

function requestLogger(req, res, next) {
	console.log(req.method, req.url);
	next();
}
app.use(requestLogger);
app.use(express.static(path.join(__dirname, "../build")));
const indexHtmlFile = path.join(__dirname, "../build/index.html");
app.use("*", (req, res) => {
	res.sendFile(indexHtmlFile);
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("listening on port " + PORT));
