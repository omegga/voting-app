const { sendPollDetailsMail, sendPollEditDetailsMail, sendSignupDetailsMail } = require("../utils");

async function notifyPollMiddleware(req, res, next) {
	try {
		await sendPollDetailsMail(req.body);
	} catch (exception) {
		next(exception);
	}
}

async function notifyPollEditMiddleware(req, res, next) {
	try {
		await sendPollEditDetailsMail(req.body);
	} catch (exception) {
		next(exception);
	}
}

async function notifySignupMiddleware(req, res, next) {
	try {
		await sendSignupDetailsMail(req.body);
	} catch (exception) {
		next(exception);
	}
}

module.exports = { 
	notifyPollMiddleware, 
	notifyPollEditMiddleware, 
	notifySignupMiddleware 
};
