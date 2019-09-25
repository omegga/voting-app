import React, { useState } from "react";
import { Container, TextField, Button } from "@material-ui/core";
import axios from "axios";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	async function handleFormSubmit(event) {
		event.preventDefault();
		const infos = {
			username, password
		};
		try {
			await axios.post("/api/users", infos);
		} catch (e) {
			console.log("error creating user");
		} finally {
			setUsername("");
			setPassword("");
		}
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
					<Button variant="contained" color="primary" type="submit">
						Submit
					</Button>
				</div>
			</form>
		</Container>
	);
};

export default Signup;
