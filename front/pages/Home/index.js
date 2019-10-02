import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import PollsList from "../../components/PollsList";
import TopHeader from "../../components/TopHeader";
import { connect } from "react-redux";
import { setPolls } from "../../reducers/actions";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { getPolls } from "../../utils";

const useStyles = makeStyles(theme => ({
	refreshList: {
		margin: theme.spacing(3, 0, 2),
	}
}));

const Home = ({ polls, userPolls, setPolls  }) => {
	function fetchPollsList() {
		getPolls()
			.then(fetchedPolls => {
				setPolls(fetchedPolls);
			});
	}

	useEffect(fetchPollsList, []);

	const classes = useStyles();

	return (
		<>
		<TopHeader />
		<Container>
			{polls.length > 0 &&
			(	<>
				<Button 
					className={classes.refreshList} 
					onClick={fetchPollsList} 
					size="small" 
					variant="contained" 
					color="primary"
				>
					Refresh Lists
				</Button>
					{ userPolls.length > 0 && 
						<PollsList 
							title="My Polls - Edit" 
							polls={userPolls} 
							createLink={id => `/polls/${id}/edit`} 
						/> 
					}
				<PollsList 
					title="Polls List - Vote" 
					polls={polls} 
					createLink={id => `/polls/${id}`} 
				/>
				</>
			)
			}
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
	const polls = [...state.polls]
		.sort(
			(pollA, pollB) => Date.parse(pollB.created) - Date.parse(pollA.created)
		);
	return {
		polls,
		userPolls: polls.filter(poll => poll.author === state.loggedUser.id)
	};
};

const mapDispatchToProps = dispatch => ({
	setPolls: polls => dispatch(setPolls(polls))
});

export default connect(mapStateToProps,mapDispatchToProps)(Home);
