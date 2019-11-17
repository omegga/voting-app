// @flow
import "./index.css";
import "./twitter.js";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import App from "./App";
import rootSaga from "./reducers/sagas";

const user = JSON.parse(window.localStorage.getItem("loggedUser"));
const initialState = {
	loggedUser: user || {},
	polls: [],
	currentPoll: {}
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	rootReducer, 
	initialState, 
	// composeWithDevTools(applyMiddleware(thunk))
	composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

const root = document.getElementById("root");
if (root !== null) {
	render(
		<Provider store={store}>
			<App />
		</Provider>
		, root);
}
