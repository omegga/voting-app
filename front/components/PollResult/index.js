import React from "react";
import PropTypes from "prop-types";

function getPercentage(votes, answer) {
	const answerCount = votes.reduce((count, vote) => {
		return answer.id === vote.answerId ? count + 1 : count;
	}, 0);
	return `${Math.round(answerCount / votes.length * 100)}%`;
}

const PollResult = ({ answers, votes }) => {
	return (
		<>
			<p>Answers:</p>
			<ol>
				{
					answers.map(answer => {
						return <li key={answer.id}>{answer.value} {getPercentage(votes, answer)}</li>;
					})
				}
			</ol>
		</>
	);
};
PollResult.propTypes = {
	answers: PropTypes.array,
	votes: PropTypes.array
};

export default PollResult;
