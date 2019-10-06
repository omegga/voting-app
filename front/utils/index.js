import ObjectID from "bson-objectid";

// returns a 24 character hex string
const createObjectID = () => ObjectID().str;

export const createEmptyAnswer = () => {
	return { _id: createObjectID(), value: "" };
};

export const createInitialAnswers = () => {
	return [
		{ _id: createObjectID(), value: "" },
		{ _id: createObjectID(), value: "" }
	];
};

const API_BASE_PATH = "/api";
const POLLS_BASE_PATH = `${API_BASE_PATH}/polls`;
const AUTH_BASE_PATH = `${API_BASE_PATH}/auth`;
const LOGIN_BASE_PATH = `${API_BASE_PATH}/login`;
const USERS_BASE_PATH = `${API_BASE_PATH}/users`;

export const getPollsRequest = () => {
	return fetch(POLLS_BASE_PATH)
		.then(res => res.json());
};

export const getPollById = pollId => {
	return fetch(`${POLLS_BASE_PATH}/${pollId}`)
		.then(res => res.json());
};

export const addVoteOnPoll = (pollId, answerId) => {
	const init = {
		method: "PUT",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ answerId })
	};
	return fetch(`${POLLS_BASE_PATH}/${pollId}/vote`, init);
};

export const authenticateUser = token => {
	const init = {
		method: "POST",
		headers: {
			Authorization: `bearer ${token}`
		}
	};
	return fetch(AUTH_BASE_PATH, init);
};

export const createPoll = (token, body) => {
	const init = {
		method: "POST",
		headers: {
			"Authorization": `bearer ${token}`,
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			question: body.question,
			answers: body.answers
		})
	};
	return fetch(POLLS_BASE_PATH, init);
};

export const authenticatePollCreator = (token, pollId) => {
	const init = {
		method: "POST",
		headers: {
			"Authorization": `bearer ${token}`,
			"Accept": "application/json"
		}
	};
	return fetch(`${POLLS_BASE_PATH}/${pollId}/auth`, init)
		.then(res => res.json());
};

export const addAnswersToPoll = (token, pollId, answers) => {
	const init = {
		method: "PUT",
		headers: {
			"Authorization": `bearer ${token}`,
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ answers })
	};
	return fetch(`${POLLS_BASE_PATH}/${pollId}`, init);
};

export const deletePollById = (token, pollId) => {
	const init = {
		method: "DELETE",
		headers: {
			"Authorization": `bearer ${token}`,
			"Accept": "application/json",
		}
	};
	return fetch(`${POLLS_BASE_PATH}/${pollId}`, init);
};

export const login = (username, password) => {
	const init = {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ username, password })
	};
	return fetch(LOGIN_BASE_PATH, init)
		.then(res => res.json())
		.then(({ id, username, token }) => ({ id, username, token }));
};

export const getUsers = () => {
	return fetch(USERS_BASE_PATH)
		.then(res => res.json());
};

export const createUser = (username, password) => {
	const init = {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ username, password })
	};
	return fetch(USERS_BASE_PATH, init);
};
