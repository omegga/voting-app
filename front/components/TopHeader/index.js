import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setLoggedUser } from "../../reducers/actions";

const TopHeader = ({ loggedUser, setLoggedUser }) => {
	useEffect(() => {
		const loggedUser = localStorage.getItem("loggedUser");
		if (loggedUser) {
			setLoggedUser(JSON.parse(loggedUser));
		}
	}, [setLoggedUser]);
	return (
		<Container>
			<Link to="/">
				<HomeIcon color="primary" />
			</Link>
			{ loggedUser.username && <span>logged as: {loggedUser.username}</span> }
		</Container>
	);
};
TopHeader.propTypes = {
	loggedUser: PropTypes.object.isRequired,
	setLoggedUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		loggedUser: state.loggedUser
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setLoggedUser: user => {
			dispatch(setLoggedUser(user));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);
