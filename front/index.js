// @flow
import "./index.css";
import "./twitter.js";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import App from "./App";

const store = createStore(rootReducer);

const root = document.getElementById("root");
if (root !== null) {
	render(
		<Provider store={store}>
			<App />
		</Provider>
		, root);
}
