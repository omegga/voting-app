import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from "@material-ui/core";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import { setLoggedUser } from "../../reducers/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Signin = ({ loggedUser, setLoggedUser }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	useEffect( function removeLoggedUserInfos() {
		localStorage.removeItem("loggedUser");
		setLoggedUser({});
	}, [setLoggedUser]);

	async function handleFormSubmit(event) {
		event.preventDefault();
		const infos = {
			username, password
		};
		try {
			const { data: { id, username, token } } = await axios.post("/api/login", infos);
			const user = { id, username, token };
			localStorage.setItem("loggedUser", JSON.stringify(user));
			setUsername("");
			setPassword("");
			setLoggedUser(user);
		} catch (e) {
			setUsername("");
			setPassword("");
		}
	}

	if (Object.keys(loggedUser).length > 0) {
		return <Redirect to="/" />;
	}

	return (
		<>
		<TopHeader />
		<Container>
			<form onSubmit={handleFormSubmit}>
				<TextField
					variant="outlined"
					margin="normal"
					label="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					name="username"
				/>
				<TextField
					variant="outlined"
					margin="normal"
					label="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					name="password"
					type="password"
				/>
				<div>
					<Button
						variant="contained"
						color="primary"
						type="submit"
					>
						Sign In
					</Button>
				</div>
			</form>
			<div>
				<Link to="/signup">
					{"Don't have an account? Sign up"}
				</Link>
			</div>
		</Container>
		</>
	);
};
Signin.propTypes = {
	loggedUser: PropTypes.object.isRequired,
	setLoggedUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		loggedUser: state.loggedUser
	};
};

const mapDispatchToProps = dispatch => ({
	setLoggedUser: loggedUser => dispatch(setLoggedUser(loggedUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
