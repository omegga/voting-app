import ObjectID from "bson-objectid";
import axios from "axios";

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
	return axios.get(`${POLLS_BASE_PATH}`).then(({ data: polls }) => polls);
};

export const getPollById = pollId => {
	return axios.get(`${POLLS_BASE_PATH}/${pollId}`)
		.then(({ data: poll }) => poll);
};

export const addVoteOnPoll = (pollId, answerId) => {
	return axios.put(`${POLLS_BASE_PATH}/${pollId}/vote`, { answerId });
};

export const authenticateUser = token => {
	const config = {
		headers: {
			Authorization: `bearer ${token}`
		}
	};
	return axios.post(AUTH_BASE_PATH, {}, config);
};

export const createPoll = (token, body) => {
	const config = {
		headers: {
			Authorization: `bearer ${token}`
		}
	};
	return axios.post(POLLS_BASE_PATH, {
		question: body.question,
		answers: body.answers
	}, config);
};

export const authenticatePollCreator = (token, pollId) => {
	const config = {
		headers: {
			Authorization: `bearer ${token}`
		}
	};
	return axios
		.post(`${POLLS_BASE_PATH}/${pollId}/auth`, {}, config)
		.then(({ data: poll }) => poll);
};

export const addAnswersToPoll = (token, pollId, answers) => {
	const config = {
		headers: {
			Authorization: `bearer ${token}`
		}
	};
	return axios.put(`${POLLS_BASE_PATH}/${pollId}`, { answers }, config);
};

export const deletePollById = (token, pollId) => {
	const config = {
		headers: {
			Authorization: `bearer ${token}`
		}
	};
	return axios.delete(`${POLLS_BASE_PATH}/${pollId}`, config);
};

export const login = (username, password) => {
	return axios
		.post(LOGIN_BASE_PATH, { username, password })
		.then(({ data: { id, username, token } }) => ({
			id,
			username,
			token
		}));
};

export const getUsers = () => {
	return axios.get(USERS_BASE_PATH).then(({ data: usersList }) => usersList);
};

export const createUser = (username, password) => {
	return axios.post(USERS_BASE_PATH, { username, password });
};
