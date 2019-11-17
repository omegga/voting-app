import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import PollResult from "../../components/PollResult";
import PollVote from "../../components/PollVote";
import TopHeader from "../../components/TopHeader";
import TwitterShareButton from "../../components/TwitterShareButton";
import { synchronizeCurrentPoll } from "../../reducers/actions";
// import { getPollById, addVoteOnPoll } from "../../utils";
// import { addVoteOnPoll } from "../../utils";
import { addVote } from "../../reducers/actions";

const useStyles = makeStyles(theme => ({
	title: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3)
	}
}));

const Poll = ({ match, currentPoll, synchronizeCurrentPoll, addVote }) => {
	const pollId = match.params.id;
	const [userHasAnswered, setUserHasAnswered] = useState(false);
	const [lastVote, setLastVote] = useState(Date.now());
	// const [notFound, setNotFound] = useState(false);
	const [notFound] = useState(false);

	useEffect(function fetchPoll() {
		synchronizeCurrentPoll(pollId);
		// getPollById(pollId)
		// 	.then(poll => {
		// 		setCurrentPoll(poll);
		// 	})
		// 	.catch(() => {
		// 		setNotFound(true);
		// 	});
	}, [pollId, lastVote, synchronizeCurrentPoll]);

	function handleFormSubmit(event, checkedAnswerId) {
		event.preventDefault();
		// await addVoteOnPoll(pollId, checkedAnswerId);
		addVote(pollId, checkedAnswerId);
		setLastVote(Date.now());
		setUserHasAnswered(true);
	}

	const classes = useStyles();

	if (notFound) {
		return (
			<>
			<TopHeader />
			<Container>
				<div>Poll not found</div>
			</Container>
			</>
		);
	}
	
	if (Object.keys(currentPoll).length === 0) {
		return (
			<>
			<TopHeader />
			<Container>
				<span>Loading poll...</span>
			</Container>
			</>
		);
	}

	return (
		<>
			<TopHeader />
			<Container>
				{
					Object.keys(currentPoll).length > 0 && (
						<>
						<Typography className={classes.title} variant="h4">Question: {currentPoll.question}</Typography>
						<Typography className={classes.title} variant="h4">Author: {currentPoll.author.username}</Typography>
						<Typography className={classes.title} variant="h5">Number of votes: {currentPoll.votes.length}</Typography>
						<TwitterShareButton text={currentPoll.question} />
						{ !userHasAnswered && <PollVote answers={currentPoll.answers} handleFormSubmit={handleFormSubmit} /> }
						{ currentPoll.votes.length > 0 && <PollResult answers={currentPoll.answers} votes={currentPoll.votes} /> }
						</>
					)
				}
			</Container>
		</>
	);
};
Poll.propTypes = {
	match: PropTypes.object,
	currentPoll: PropTypes.object.isRequired,
	synchronizeCurrentPoll: PropTypes.func.isRequired,
	addVote: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		currentPoll: state.currentPoll
	};
};

const mapDispatchToProps = dispatch => ({
	synchronizeCurrentPoll: poll => dispatch(synchronizeCurrentPoll(poll)),
	addVote: (pollId, answerId) => dispatch(addVote(pollId, answerId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
