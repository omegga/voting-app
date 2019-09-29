import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import axios from "axios";
import PollResult from "../../components/PollResult";
import PollVote from "../../components/PollVote";
import TopHeader from "../../components/TopHeader";

const Poll = ({ match }) => {
	const pollId = match.params.id;
	const [poll, setPoll] = useState(null);
	const [userHasAnswered, setUserHasAnswered] = useState(false);
	const [lastVote, setLastVote] = useState(Date.now());
	const [notFound, setNotFound] = useState(false);

	useEffect(function fetchPoll() {
		axios.get(`/api/polls/${pollId}`)
			.then(({ data }) => {
				setPoll(data);
			})
			.catch(() => {
				setNotFound(true);
			});
	}, [pollId, lastVote]);

	async function handleFormSubmit(event, checkedAnswerId) {
		event.preventDefault();
		await axios.put(`/api/polls/${pollId}/vote`, {
			answerId: checkedAnswerId
		});
		setLastVote(Date.now());
		setUserHasAnswered(true);
	}

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
	
	if (!poll) {
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
					poll && (
						<>
						<h1>Question: {poll.question}</h1>
						<h2>Author: {poll.author.username}</h2>
						<h3>Number of votes: {poll.votes.length}</h3>
						{ !userHasAnswered && <PollVote answers={poll.answers} handleFormSubmit={handleFormSubmit} /> }
						{ poll.votes.length > 0 && <PollResult answers={poll.answers} votes={poll.votes} /> }
						</>
					)
				}
			</Container>
		</>
	);
};
Poll.propTypes = {
	match: PropTypes.object
};

export default Poll;
