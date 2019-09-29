import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import TopHeader from "../../components/TopHeader";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [users, setUsers] = useState([]);
	const [usersListFetched, setUsersListFetched] = useState(false);
	const [lastSubmission , setLastSubmission] = useState(null);
	const [userHasSignedUp, setUserHasSignedUp] = useState(false);
	const [redirectToHome, setRedirectToHome] = useState(false);

	useEffect(() => {
		(async function() {
			const { data: usersList } = await axios.get("/api/users");
			setUsers(usersList);
			setUsersListFetched(true);
		})();
	}, [lastSubmission]);

	useEffect(() => {
		if (userHasSignedUp) {
			setTimeout(() => {
				setRedirectToHome(true);
			}, 5000);
		}
	}, [userHasSignedUp]);

	async function handleFormSubmit(event) {
		event.preventDefault();
		const infos = {
			username, password
		};
		try {
			await axios.post("/api/users", infos);
			setUsername("");
			setPassword("");
			setLastSubmission(Date.now());
			setUserHasSignedUp(true);
		} catch (e) {
			console.log("error creating user");
		} finally {
			setUsername("");
			setPassword("");
		}
	}

	if (redirectToHome) {
		return <Redirect to="/" />;
	}

	if (userHasSignedUp) {
		return (
			<>
			<TopHeader />
			<Container>
				<div>Successfully signed up! Redirecting to homepage in a few seconds...</div>
			</Container>
			</>
		);
	}

	if (!usersListFetched) {
		return null;
	}

	const userExists = users
		.map(x => x.username)
		.includes(username);

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
						Sign up
					</Button>
				</div>
			</form>
		</Container>
		</>
	);
};

export default Signup;
