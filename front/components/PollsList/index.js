import React from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PollsList = ({ title, polls }) => {
	return (
		<>
			<Typography variant="h4">
				{title}
			</Typography>
			<List>
				{
					polls.map((poll, index) => {
						return (
							<ListItem key={index}>
								<Link to={`/polls/${poll.id}`}>
									{poll.question.includes("?") ? poll.question : `${poll.question} ?`}
								</Link>
							</ListItem>
						);
					})
				}
			</List>
		</>
	);
};
PollsList.propTypes = {
	title: PropTypes.string,
	polls: PropTypes.array,
};

export default PollsList;
