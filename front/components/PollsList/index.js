import React from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles(() => ({
	pollQuestion: {
		textDecoration: "none"
	}
}));

const PollsList = ({ title, polls, createLink }) => {
	const classes = useStyles();
	return (
		<>
			<Typography variant="h5">
				{title}
			</Typography>
			<List>
				{
					polls.map((poll, index) => {
						const fromNow = moment(poll.created).fromNow();
						return (
							<ListItem key={index}>
								<Link className={classes.pollQuestion} to={createLink(poll.id)}>
									{poll.question.includes("?") ? `${poll.question} - ${fromNow}` : `${poll.question} ? - ${fromNow}`}
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
	createLink: PropTypes.func.isRequired
};

export default PollsList;
