import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Typography } from "@material-ui/core";
import axios from "axios";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import PollResult from "../../components/PollResult";
import PollVote from "../../components/PollVote";
import TopHeader from "../../components/TopHeader";
import TwitterShareButton from "../../components/TwitterShareButton";
import { setCurrentPoll } from "../../reducers/actions";

const useStyles = makeStyles(theme => ({
	title: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3)
	}
}));

const Poll = ({ match, currentPoll, setCurrentPoll }) => {
	const pollId = match.params.id;
	const [userHasAnswered, setUserHasAnswered] = useState(false);
	const [lastVote, setLastVote] = useState(Date.now());
	const [notFound, setNotFound] = useState(false);

	useEffect(function fetchPoll() {
		axios.get(`/api/polls/${pollId}`)
			.then(({ data }) => {
				setCurrentPoll(data);
			})
			.catch(() => {
				setNotFound(true);
			});
	}, [pollId, lastVote, setCurrentPoll]);

	async function handleFormSubmit(event, checkedAnswerId) {
		event.preventDefault();
		await axios.put(`/api/polls/${pollId}/vote`, {
			answerId: checkedAnswerId
		});
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
	setCurrentPoll: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		currentPoll: state.currentPoll
	};
};

const mapDispatchToProps = dispatch => ({
	setCurrentPoll: poll => dispatch(setCurrentPoll(poll))
});

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
