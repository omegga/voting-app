const nodemailer = require("nodemailer");

function createTransporter() {
	return nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_HOST_PORT,
		secure: true,
		auth: {
			user: process.env.EMAIL_SENDER_USERNAME,
			pass: process.env.EMAIL_SENDER_PASSWORD
		}
	});
}

async function sendPollDetailsMail(body) {
	const { question, answers } = body;
	const transporter = createTransporter();
	const answersList = answers
		.map(answer => {
			return `<li>${answer.value}</li>`;
		})
		.join("\n");

	await transporter.sendMail({
		from: process.env.EMAIL_SENDER_USERNAME,
		to: process.env.EMAIL_RECIPIENT,
		subject: "new poll from voting app!",
		text: "new poll",
		html: `
			<h1>${question}</h1>
			<ul>${answersList}</ul>
		`
	});
}

async function sendPollEditDetailsMail(body) {
	const { answers } = body;
	const transporter = createTransporter();
	const answersList = answers
		.map(answer => {
			return `<li>${answer.value}</li>`;
		})
		.join("\n");

	await transporter.sendMail({
		from: process.env.EMAIL_SENDER_USERNAME,
		to: process.env.EMAIL_RECIPIENT,
		subject: "poll edit from voting app!",
		text: "poll edit",
		html: `
			<ul>${answersList}</ul>
		`
	});
}


async function sendSignupDetailsMail(body) {
	const { username } = body;
	const transporter = createTransporter();
	await transporter.sendMail({
		from: process.env.EMAIL_SENDER_USERNAME,
		to: process.env.EMAIL_RECIPIENT,
		subject: "new signup from voting app!",
		text: "new signup",
		html: `
			<h1>New Signup</h1>
			<h2>USER: ${username}</h2>
		`
	});
}

module.exports = { 
	sendPollDetailsMail, 
	sendPollEditDetailsMail, 
	sendSignupDetailsMail 
};
