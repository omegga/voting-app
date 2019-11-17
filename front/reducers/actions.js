// import { login, getPollsRequest } from "../utils";
// import { login } from "../utils";

export const GET_POLLS = "GET_POLLS";
export const ADD_VOTE = "ADD_VOTE";
export const CREATE_POLL = "CREATE_POLL";
export const LOGIN_USER = "LOGIN_USER";
export const SET_POLL = "SET_POLL";

export const SET_LOGGED_USER = "SET_LOGGED_USER";
export const SET_POLLS = "SET_POLLS";
export const SYNCHRONIZE_CURRENT_POLL = "SYNCHRONIZE_CURRENT_POLL";
export const SET_CURRENT_POLL = "SET_CURRENT_POLL";

// export const getPolls = () => async dispatch => {
// 	const polls = await getPollsRequest();
// 	dispatch(setPollsActionCreator(polls));
// };

export const getPolls = () => {
	return {
		type: GET_POLLS
	};
};

export function synchronizeCurrentPoll(pollId) {
	return {
		type: SYNCHRONIZE_CURRENT_POLL,
		payload: pollId
	};
}

export function setPoll(poll) {
	return {
		type: SET_POLL,
		payload: poll
	};
}

export function setPolls(polls) {
	return {
		type: SET_POLLS,
		payload: polls
	};
}

export function addVote(pollId, answerId) {
	return {
		type: ADD_VOTE,
		payload: {
			pollId,
			answerId
		}
	};
}

export function createPoll(token, body) {
	return {
		type: CREATE_POLL,
		payload: {
			token,
			body
		}
	};
}

export function setLoggedUser(user) {
	return {
		type: SET_LOGGED_USER,
		payload: user
	};
}

// export const loginAndSetLoggedUser = (username, password) => async dispatch => {
// 	const user = await login(username, password);
// 	localStorage.setItem("loggedUser", JSON.stringify(user));
// 	dispatch(setLoggedUser(user));
// };

export function loginUser(username, password) {
	return {
		type: LOGIN_USER,
		payload: {
			username, password
		}
	};
}
