import { login, getPollsRequest } from "../utils";

export const SET_LOGGED_USER = "SET_LOGGED_USER";
export const SET_POLLS = "SET_POLLS";
export const SET_CURRENT_POLL = "SET_CURRENT_POLL";

export function setPollsActionCreator(polls) {
	return {
		type: SET_POLLS,
		payload: polls
	};
}

export function setCurrentPoll(poll) {
	return {
		type: SET_CURRENT_POLL,
		payload: poll
	};
}

export function setLoggedUser(user) {
	return {
		type: SET_LOGGED_USER,
		payload: user
	};
}

export const loginAndSetLoggedUser = (username, password) => async dispatch => {
	const user = await login(username, password);
	localStorage.setItem("loggedUser", JSON.stringify(user));
	dispatch(setLoggedUser(user));
};

export const getPolls = () => async dispatch => {
	const polls = await getPollsRequest();
	dispatch(setPollsActionCreator(polls));
};