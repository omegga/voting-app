import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Button } from "@material-ui/core";
import axios from "axios";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function getPercentage(poll, answer) {
	const answerCount = poll.votes.reduce((count, vote) => {
		return answer.id === vote.answerId ? count + 1 : count;
	}, 0);
	return `${Math.round(answerCount / poll.votes.length * 100)}%`;
}

const Poll = ({ match }) => {
	const pollId = match.params.id;
	const [poll, setPoll] = useState(null);
	const [userHasAnswered, setUserHasAnswered] = useState(false);
	const [lastVote, setLastVote] = useState(Date.now());
	const [checkedAnswerId, setCheckedAnswerId] = useState("");

	useEffect(() => {
		axios.get(`/api/polls/${pollId}`)
			.then(({ data }) => {
				setPoll(data);
			});
	}, [pollId, lastVote]);

	async function handleFormSubmit(event) {
		event.preventDefault();

		await axios.put("/api/polls/vote", {
			pollId,
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
					{
						!userHasAnswered && (
							<form onSubmit={handleFormSubmit}>
								<RadioGroup>
									{
										poll.answers.map(answer => {
											return (
												<FormControlLabel 
													key={answer.id} 
													control={<Radio />} 
													value={answer.id} 
													label={answer.value}
													checked={checkedAnswerId === answer.id}
													onChange={() => setCheckedAnswerId(answer.id)}
												/>
											);
										})
									}
								</RadioGroup>
								<Button disabled={checkedAnswerId.length === 0} type="submit" variant="contained" color="primary">Submit Vote</Button>
							</form>
						)
					}
					{ 
						userHasAnswered && (
						<>
							<p>Answers:</p>
							<ol>
								{
									poll.answers.map(answer => {
										return <li key={answer.id}>{answer.value} {getPercentage(poll, answer)}</li>;
									})
								}
							</ol>
						</>
						)
					}
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
