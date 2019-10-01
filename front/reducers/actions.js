export const SET_LOGGED_USER = "SET_LOGGED_USER";
export const SET_POLLS = "SET_POLLS";
export const SET_CURRENT_POLL = "SET_CURRENT_POLL";

export function setLoggedUser(user) {
	return {
		type: SET_LOGGED_USER,
		payload: user
	};
}

export function setPolls(polls) {
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
