import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import ButtonLink from "../../components/ButtonLink";
import PollsList from "../../components/PollsList";
import UserPollsList from "../../components/UserPollsList";
import TopHeader from "../../components/TopHeader";
import { connect } from "react-redux";
import { setPolls } from "../../reducers/actions";
import PropTypes from "prop-types";


const Home = ({ loggedUser, polls, userPolls, setPolls  }) => {
	function fetchPollsList() {
		axios.get("/api/polls")
			.then(({ data: fetchedPolls }) => {
				setPolls(fetchedPolls);
			});
	}

	useEffect(fetchPollsList, []);

	return (
		<>
		<TopHeader />
		<Container>
			{ Object.keys(loggedUser).length > 0
				? (
					<>
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
		</>
	);
};
Home.propTypes = {
	loggedUser: PropTypes.object.isRequired,
	polls: PropTypes.array.isRequired,
	userPolls: PropTypes.array.isRequired,
	setPolls: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		loggedUser: state.loggedUser,
		polls: state.polls,
		userPolls: state.polls.filter(poll => poll.author === state.loggedUser.id)
	};
};

const mapDispatchToProps = dispatch => ({
	setPolls: polls => dispatch(setPolls(polls))
});

export default connect(mapStateToProps,mapDispatchToProps)(Home);
