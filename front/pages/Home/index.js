import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import ButtonLink from "../../components/ButtonLink";
import PollCreator from "../../components/PollCreator";
import axios from "axios";
import { Link } from "react-router-dom";

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
				polls.length > 0 && (
					<>
					<Typography variant="h4">
						Polls List
					</Typography>
					<ul>
						{ 
							polls.map((poll, index) => {
								return (
									<Link key={index} to={`/polls/${poll.id}`}>
										<li>{poll.question.includes("?") ? poll.question : `${poll.question} ?`}</li>
									</Link>
								);
							}) 
						}
					</ul>
					</>
				)
			}
		</Container>
	);
};

export default Home;
