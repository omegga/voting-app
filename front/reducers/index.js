import { combineReducers } from "redux";
import { SET_LOGGED_USER, SET_POLLS, SET_CURRENT_POLL } from "./actions";

function polls(state = [], action) {
	switch (action.type) {
	case SET_POLLS:
		return action.payload;
	default:
		return state;
	}
}

function currentPoll(state = {}, action) {
	switch(action.type) {
	case SET_CURRENT_POLL:
		return action.payload;
	default:
		return state;
	}
}

function loggedUser(state = {}, action) {
	switch (action.type) {
	case SET_LOGGED_USER:
		return action.payload;
	default:
		return state;
	}
}

const rootReducer = combineReducers({
	loggedUser,
	polls,
	currentPoll
});

export default rootReducer;
