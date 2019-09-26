import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import axios from "axios";
import ButtonLink from "../../components/ButtonLink";
import PollsList from "../../components/PollsList";
import { Link } from "react-router-dom";

const Home = () => {
	const [userLoggedStatusFetched, setUserLoggedStatusFetched] = useState(false);
	const [user, setUser] = useState(null);
	const [polls, setPolls] = useState([]);

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
	}, []);

	if (!userLoggedStatusFetched) {
		return null;
	}

	return (
		
		<Container>
			{ user
				? (
					<>
						<div>
							Logged as: {user.username} 
						</div>
						<div>
							<Link 
								style={{ textDecoration: "none"}}
								to="/signin"
							>
								Sign out
							</Link>
						</div>
						<ButtonLink 
							to="/polls/new" 
							text="Create a new poll" 
							buttonProps={{ variant: "contained", color: "primary"}} 
						/>
					</>
				)
				: (<ButtonLink 
					to="/signin" 
					text="Sign in" 
					buttonProps={{ variant: "contained", color: "primary" }} 
				/>)
			}
			{ polls.length > 0 && <PollsList polls={polls} /> }
		</Container>
	);
};

export default Home;
