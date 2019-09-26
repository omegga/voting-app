import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import axios from "axios";

const Poll = ({ match }) => {
	const pollId = match.params.id;
	const [poll, setPoll] = useState(null);

	useEffect(() => {
		axios.get(`/api/polls/${pollId}`)
			.then(({ data }) => {
				setPoll(data);
			});
	}, [pollId]);
	
	return (
		<Container>
			{ !poll && <span>Loading...</span>}
			{
				poll && (
					<>
					<h1>Question: {poll.question}</h1>
					<h2>Author: {poll.author.username}</h2>
					<p>Votes: {poll.votes.length}</p>
					Answers:
					<ul>
						{
							poll.answers.map(answer => {
								return <li key={answer.id}>{answer.value}</li>;
							})
						}
					</ul>
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
