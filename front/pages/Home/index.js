import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import ButtonLink from "../../components/ButtonLink";

const Home = () => {
	const [userLoggedStatusFetched, setUserLoggedStatusFetched] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const loggedUser = localStorage.getItem("loggedUser");
		setUserLoggedStatusFetched(true);
		if (loggedUser) {
			setUser(JSON.parse(loggedUser));
		}
	}, []);

	if (!userLoggedStatusFetched) {
		return null;
	}

	return (
		
		<Container>
			{ user && (
					<>
						<p>
							Logged as: {user.username}
						</p>
						<ButtonLink to="/signin" text="Logout" buttonProps={{ variant: "contained", color: "secondary"}} />
					</>
			) 
			}
			{ !user && (
				<ButtonLink to="/signin" text="Sign in" buttonProps={{ variant: "contained", color: "primary" }} />
			)}
		</Container>
	);
};

export default Home;
