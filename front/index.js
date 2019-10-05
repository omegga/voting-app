// @flow
import "./index.css";
import "./twitter.js";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import App from "./App";

const user = JSON.parse(window.localStorage.getItem("loggedUser"));
const initialState = {
	loggedUser: user || {},
	polls: [],
	currentPoll: {}
};

const store = createStore(
	rootReducer, 
	initialState, 
	composeWithDevTools(applyMiddleware(thunk))
);

const root = document.getElementById("root");
if (root !== null) {
	render(
		<Provider store={store}>
			<App />
		</Provider>
		, root);
}
