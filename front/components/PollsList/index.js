import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

const PollsList = ({ polls, fetchPollsList }) => {
	return (
		<>
			<Typography variant="h4">
				Polls List
			</Typography>
			<Button onClick={fetchPollsList} size="small" variant="contained" color="primary">Refresh List</Button>
			<ul>
				{
					polls.map((poll, index) => {
						return (
							<Link key={index} to={`/polls/${poll.id}`}>
								<li>{poll.question.includes("?") ? poll.question : `${poll.question} ?`}</li>
							</Link>
						);
					})
				}
			</ul>
		</>
	);
};
PollsList.propTypes = {
	polls: PropTypes.array,
	fetchPollsList: PropTypes.func
};

export default PollsList;