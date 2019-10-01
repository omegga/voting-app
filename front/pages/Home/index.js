import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import axios from "axios";
import PollsList from "../../components/PollsList";
import UserPollsList from "../../components/UserPollsList";
import TopHeader from "../../components/TopHeader";
import { connect } from "react-redux";
import { setPolls } from "../../reducers/actions";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	refreshList: {
		margin: theme.spacing(3, 0, 2),
	}
}));

const Home = ({ polls, userPolls, setPolls  }) => {
	function fetchPollsList() {
		axios.get("/api/polls")
			.then(({ data: fetchedPolls }) => {
				setPolls(fetchedPolls);
			});
	}

	useEffect(fetchPollsList, []);

	const classes = useStyles();

	return (
		<>
		<TopHeader />
		<Container>
			<Button className={classes.refreshList} onClick={fetchPollsList} size="small" variant="contained" color="primary">Refresh List</Button>
			{userPolls.length > 0 && (
				<UserPollsList title="My Polls" polls={userPolls} createLink={id => `/polls/${id}/edit`} />
			)}
			{polls.length > 0 && (
				<PollsList title="Polls List" polls={polls} createLink={id => `/polls/${id}`} />
			)}
		</Container>
		</>
	);
};
Home.propTypes = {
	polls: PropTypes.array.isRequired,
	userPolls: PropTypes.array.isRequired,
	setPolls: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		polls: state.polls,
		userPolls: state.polls.filter(poll => poll.author === state.loggedUser.id)
	};
};

const mapDispatchToProps = dispatch => ({
	setPolls: polls => dispatch(setPolls(polls))
});

export default connect(mapStateToProps,mapDispatchToProps)(Home);
