// @flow

import "./index.css";
import React from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";

const App = () => {
	return <p>Voting App</p>;
};

App.propTypes = {
	text: PropTypes.string
};

const root = document.getElementById("root");
if (root !== null) {
	render(<App />, root);
}
