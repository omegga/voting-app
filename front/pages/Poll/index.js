import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import axios from "axios";
import PollResult from "../../components/PollResult";
import PollVote from "../../components/PollVote";

const Poll = ({ match }) => {
	const pollId = match.params.id;
	const [poll, setPoll] = useState(null);
	const [userHasAnswered, setUserHasAnswered] = useState(false);
	const [lastVote, setLastVote] = useState(Date.now());

	useEffect(() => {
		axios.get(`/api/polls/${pollId}`)
			.then(({ data }) => {
				setPoll(data);
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

	return (
		<Container>
			{ !poll && <span>Loading...</span>}
			{
				poll && (
					<>
					<h1>Question: {poll.question}</h1>
					<h2>Author: {poll.author.username}</h2>
					<p>Votes: {poll.votes.length}</p>
					{ !userHasAnswered && <PollVote answers={poll.answers} handleFormSubmit={handleFormSubmit} /> }
					{ userHasAnswered && <PollResult answers={poll.answers} votes={poll.votes} /> }
					</>
				)
			}
		</Container>
	);
};
Poll.propTypes = {
	match: PropTypes.object
};

export default Poll;
