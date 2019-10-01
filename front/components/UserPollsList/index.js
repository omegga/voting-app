import React from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	pollQuestion: {
		textDecoration: "none"
	}
}));

const UserPollsList = ({ title, polls, createLink }) => {
	const classes = useStyles();
	return (
		<>
			<Typography variant="h5">
				{title}
			</Typography>
			<List>
				{
					polls.map((poll, index) => {
						return (
							<ListItem key={index}>
								<Link className={classes.pollQuestion} to={createLink(poll.id)}>
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
UserPollsList.propTypes = {
	title: PropTypes.string,
	polls: PropTypes.array,
	createLink: PropTypes.func.isRequired
};

export default UserPollsList;
