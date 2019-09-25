import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button, Container } from "@material-ui/core";

const Home = () => {
	const [userLoggedStatusFetched, setUserLoggedStatusFetched] = useState(false);
	const [userIsLogged, setUserIsLogged] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const loggedUser = localStorage.getItem("loggedUser");
		setUserLoggedStatusFetched(true);
		if (loggedUser) {
			setUser(JSON.parse(loggedUser));
			setUserIsLogged(true);
		}
	}, []);

	if (!userLoggedStatusFetched) {
		return null;
	}

	if (!userIsLogged) {
		return <Redirect to="/signin" />;
	}

	return (
		
		<Container>
			<p>
				Logged as: {user.username}
			</p>
			<Link to="/signin">
				<Button variant="contained">Logout</Button>
			</Link>
		</Container>
	);
};

export default Home;
