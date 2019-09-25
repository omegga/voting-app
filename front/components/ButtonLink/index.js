import "./index.css";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const ButtonLink = ({ to, text, buttonProps }) => {
	return (
		<Link to={to} className="button-link">
			<Button {...buttonProps} >{text}</Button>
		</Link>
	);
};
ButtonLink.propTypes = {
	to: PropTypes.string,
	text: PropTypes.string,
	buttonProps: PropTypes.object
};

export default ButtonLink;
