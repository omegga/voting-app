import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import axios from "axios";
import ButtonLink from "../../components/ButtonLink";
import PollCreator from "../../components/PollCreator";
import PollsList from "../../components/PollsList";

const Home = () => {
	const [userLoggedStatusFetched, setUserLoggedStatusFetched] = useState(false);
	const [user, setUser] = useState(null);
	const [polls, setPolls] = useState([]);
	const [lastPollSubmit, setLastPollSubmit] = useState(Date.now());

	useEffect(() => {
		const loggedUser = localStorage.getItem("loggedUser");
		setUserLoggedStatusFetched(true);
		if (loggedUser) {
			setUser(JSON.parse(loggedUser));
		}
	}, []);

	useEffect(() => {
		axios.get("/api/polls")
			.then(({ data }) => {
				setPolls(data);
			});
	}, [lastPollSubmit]);

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
						<PollCreator userToken={user.token} setLastPollSubmit={setLastPollSubmit} />
					</>
			) 
			}
			{ !user && (
				<ButtonLink to="/signin" text="Sign in" buttonProps={{ variant: "contained", color: "primary" }} />
			)}
			{
				polls.length > 0 && <PollsList polls={polls} />
			}
		</Container>
	);
};

export default Home;
