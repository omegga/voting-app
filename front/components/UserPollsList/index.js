import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UserPollsList = ({ title, polls }) => {
	return (
		<>
			<Typography variant="h4">
				{title}
			</Typography>
			<ul>
				{
					polls.map((poll, index) => {
						return (
							<Link key={index} to={`/polls/${poll.id}/edit`}>
								<li>{poll.question.includes("?") ? poll.question : `${poll.question} ?`}</li>
							</Link>
						);
					})
				}
			</ul>
		</>
	);
};
UserPollsList.propTypes = {
	title: PropTypes.string,
	polls: PropTypes.array,
};

export default UserPollsList;
