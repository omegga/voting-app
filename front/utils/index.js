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

export const getPollsRequest = () => {
	return axios.get("/api/polls").then(({ data: polls }) => polls);
};

export const getPollById = pollId => {
	return axios.get(`/api/polls/${pollId}`)
		.then(({ data: poll }) => poll);
};

export const addVoteOnPoll = (pollId, answerId) => {
	return axios.put(`/api/polls/${pollId}/vote`, { answerId });
};

export const authenticateUser = token => {
	const config = {
		headers: {
			Authorization: `bearer ${token}`
		}
	};
	return axios.post("/api/auth", {}, config);
};

export const createPoll = (token, body) => {
	const config = {
		headers: {
			Authorization: `bearer ${token}`
		}
	};
	return axios.post("/api/polls", {
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
		.post(`/api/polls/${pollId}/auth`, {}, config)
		.then(({ data: poll }) => poll);
};

export const addAnswersToPoll = (token, pollId, answers) => {
	const config = {
		headers: {
			Authorization: `bearer ${token}`
		}
	};
	return axios.put(`/api/polls/${pollId}`, { answers }, config);
};

export const deletePollById = (token, pollId) => {
	const config = {
		headers: {
			Authorization: `bearer ${token}`
		}
	};
	return axios.delete(`/api/polls/${pollId}`, config);
};

export const login = (username, password) => {
	return axios
		.post("/api/login", { username, password })
		.then(({ data: { id, username, token } }) => ({ 
			id, 
			username, 
			token
		}));
};

export const getUsers = () => {
	return axios.get("/api/users").then(({ data: usersList }) => usersList);
};

export const createUser = (username, password) => {
	return axios.post("/api/users", { username, password });
};
