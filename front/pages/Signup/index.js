import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from "@material-ui/core";
import axios from "axios";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [users, setUsers] = useState([]);
	const [usersListFetched, setUsersListFetched] = useState(false);
	const [lastSubmission , setLastSubmission] = useState(null);
	useEffect(() => {
		(async function() {
			const { data: usersList } = await axios.get("/api/users");
			setUsers(usersList);
			setUsersListFetched(true);
		})();
	}, [lastSubmission]);
	
	if (!usersListFetched) {
		return null;
	}

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
			setLastSubmission(Date.now());
		}
	}
	
	const userExists = users
		.map(x => x.username)
		.includes(username);

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
				{ userExists && <div>Username already exists</div> }
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
						disabled={userExists}
						variant="contained" 
						color="primary" 
						type="submit"
					>
						Submit
					</Button>
				</div>
			</form>
		</Container>
	);
};

export default Signup;
