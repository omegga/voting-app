import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import axios from "axios";
import ButtonLink from "../../components/ButtonLink";
import PollsList from "../../components/PollsList";
import UserPollsList from "../../components/UserPollsList";
import { Link } from "react-router-dom";

const Home = () => {
	const [userLoggedStatusFetched, setUserLoggedStatusFetched] = useState(false);
	const [user, setUser] = useState(null);
	const [polls, setPolls] = useState([]);
	const [userPolls, setUserPolls] = useState([]);
	const [lastPollsFetch, setLastPollsFetched] = useState(Date.now());

	useEffect(() => {
		const loggedUser = localStorage.getItem("loggedUser");
		setUserLoggedStatusFetched(true);
		if (loggedUser) {
			setUser(JSON.parse(loggedUser));
		}
	}, []);

	useEffect(() => {
		if (userLoggedStatusFetched && user) {
			const config = {
				headers: {
					Authorization: `bearer ${user.token}`
				}
			};
			axios.get(`/api/users/${user.id}/polls`, config)
				.then(({ data }) => setUserPolls(data));
		}
	}, [user, userLoggedStatusFetched, lastPollsFetch]);

	useEffect(() => {
		axios.get("/api/polls")
			.then(({ data }) => {
				setPolls(data);
			});
	}, [lastPollsFetch]);

	function fetchPollsList() {
		setLastPollsFetched(Date.now());
	}

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
			<div>
				<Button onClick={fetchPollsList} size="small" variant="contained" color="primary">Refresh List</Button>
			</div>
			{ userPolls.length > 0 && (
				<UserPollsList title="My Polls" polls={userPolls} />
			) 
			}
			{ polls.length > 0 && (
				<PollsList title="Polls List" polls={polls} />
			) 
			}
		</Container>
	);
};

export default Home;
