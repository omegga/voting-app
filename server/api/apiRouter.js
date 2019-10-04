const express = require("express");
const config = require("config");
const usersRouter = require("./users/usersRouter");
const loginRouter = require("./login/loginRouter");
const pollsRouter = require("./polls/pollsRouter");
const authRouter = require("./auth/authRouter");

const router = express.Router();
router.use(config.get("Server.loginPath"), loginRouter);
router.use(config.get("Server.pollsPath"), pollsRouter);
router.use(config.get("Server.authPath"), authRouter);
router.use(config.get("Server.usersPath"), usersRouter);

module.exports = router;
