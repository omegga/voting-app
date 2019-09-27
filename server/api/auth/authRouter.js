const express = require("express");
const authMiddleware = require("../../middleware/auth");

const router = express.Router();
router.post("/", authMiddleware, (req, res) => {
	res.sendStatus(200);
});

module.exports = router;
