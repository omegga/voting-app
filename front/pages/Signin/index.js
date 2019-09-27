import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from "@material-ui/core";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

const Signin = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		localStorage.removeItem("loggedUser");
	}, []);

	async function handleFormSubmit(event) {
		event.preventDefault();
		const infos = {
			username, password
		};
		try {
			const { data: { id, username, token } } = await axios.post("/api/login", infos);
			localStorage.setItem("loggedUser", JSON.stringify({ id, username, token }));
			setUsername("");
			setPassword("");
			setIsLogged(true);
		} catch (e) {
			setUsername("");
			setPassword("");
		}
	}

	if (isLogged) {
		return <Redirect to="/" />;
	}

	return (
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
	);
};

export default Signin;