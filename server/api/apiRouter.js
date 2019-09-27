const express = require("express");
const usersRouter = require("./users/usersRouter");
const loginRouter = require("./login/loginRouter");
const pollsRouter = require("./polls/pollsRouter");
const authRouter = require("./auth/authRouter");

const router = express.Router();
router.use("/users", usersRouter);
router.use("/login", loginRouter);
router.use("/polls", pollsRouter);
router.use("/auth", authRouter);

module.exports = router;
