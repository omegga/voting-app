import { put, takeEvery, all } from "redux-saga/effects";
import { 
	GET_POLLS, 
	setPolls, 
	ADD_VOTE, 
	CREATE_POLL, 
	LOGIN_USER,
	setLoggedUser,
	SYNCHRONIZE_CURRENT_POLL, 
	setPoll
} from "./actions";
import { 
	getPollsRequest, 
	getPollById, 
	addVoteOnPoll,
	createPoll as createPollRequest,
	login as loginRequest
} from "../utils";

function* getPolls() {
	const polls = yield getPollsRequest();
	yield put(setPolls(polls));
}

function* watchGetPollsRequest() {
	yield takeEvery(GET_POLLS, getPolls);
}

function* synchronizeCurrentPoll(action) {
	const poll = yield getPollById(action.payload);
	yield put(setPoll(poll));
}

function* watchSynchronizeCurrentPoll() {
	yield takeEvery(SYNCHRONIZE_CURRENT_POLL, synchronizeCurrentPoll);
}

function* addVote(action) {
	const { pollId, answerId } = action.payload;
	yield addVoteOnPoll(pollId, answerId);
}

function* watchAddVote() {
	yield takeEvery(ADD_VOTE, addVote);
}

function* createPoll({ payload }) {
	yield createPollRequest(payload.token, payload.body);
}

function* watchCreatePoll() {
	yield takeEvery(CREATE_POLL, createPoll);
}

function* loginUser({ payload }) {
	const user = yield loginRequest(payload.username, payload.password);
	localStorage.setItem("loggedUser", JSON.stringify(user));
	yield put(setLoggedUser(user));
}

function* watchLoginUser() {
	yield takeEvery(LOGIN_USER, loginUser);
}

export default function* rootSaga() {
	yield(all([
		watchGetPollsRequest(),
		watchSynchronizeCurrentPoll(),
		watchAddVote(),
		watchCreatePoll(),
		watchLoginUser()
	]));
}
