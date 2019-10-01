import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import ClearIcon from "@material-ui/icons/Clear";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import ObjectID from "bson-objectid";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TopHeader from "../../components/TopHeader";

// returns a 24 character hex string
const createObjectID = () => ObjectID().str;

const createAnswer = () => {
	return { _id: createObjectID(), value: "" };
};

const useStyles = makeStyles(theme => ({
	title: {
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(2)
	}
}));

const PollEditor = ({ match, loggedUser }) => {
	const pollId = match.params.id;
	const [poll, setPoll] = useState(null);
	const [loginError, setLoginError] = useState(false);
	const [authError, setAuthError] = useState(false);
	const [answers, setAnswers] = useState([]);
	const [userHasEditedPoll, setUserHasEditedPoll] = useState(Date.now());
	const [userHasDeletedPoll, setUserHasDeletedPoll] = useState(false);

	useEffect(function checkLoggedUser() {
		if (Object.keys(loggedUser).length === 0) {
			setLoginError(true);
		}
	}, [loggedUser]);

	useEffect(function authenticatePollAuthorAndFetchPollData() {
		if (Object.keys(loggedUser).length > 0) {
			const config = {
				headers: {
					Authorization: `bearer ${loggedUser.token}`
				}
			};
			axios.post(`/api/polls/${pollId}/auth`, {}, config)
				.then(({ data: pollData }) => {
					setPoll(pollData);
				})
				.catch(() => {
					setAuthError(true);
				});
		}
	}, [loggedUser, pollId, userHasEditedPoll]);

	function removeAnswer(answerId){
		setAnswers(answers.filter(answer => answer._id !== answerId));
	}

	function handleAnswersChange(event, index) {
		const newAnswers = answers.map((a, i) => {
			if (i === index) {
				return { ...a, value: event.target.value };
			}
			return a;
		});
		setAnswers(newAnswers);
	}

	function addAnswer() {
		setAnswers([...answers, createAnswer()]);
	}

	async function handleFormSubmit(event) {
		event.preventDefault();
		const config = {
			headers: {
				Authorization: `bearer ${loggedUser.token}`
			}
		};
		await axios.put(`/api/polls/${pollId}`, { answers }, config);
		setAnswers([]);
		setUserHasEditedPoll(Date.now());
	}

	async function deletePoll() {
		const config = {
			headers: {
				Authorization: `bearer ${loggedUser.token}`
			}
		};
		await axios.delete(`/api/polls/${pollId}`, config);
		setUserHasDeletedPoll(true);
	}

	const classes = useStyles();

	if (userHasDeletedPoll) {
		return <Redirect to="/" />;
	}

	if (authError) {
		return (
			<>
			<TopHeader />
			<Container>
				<div>401 Unauthorized</div>
			</Container>
			</>
		);
	}

	if (loginError) {
		return <Redirect to="/signin" />;
	}

	if (!poll) {
		return (
			<>
			<TopHeader/>
			<Container>
				<div>Loading...</div>
			</Container>
			</>
		);
	}

	return (
		<>
		<TopHeader />
		<Container>
			<Typography variant="h4" className={classes.title}>
				Edit poll
			</Typography>
			<form onSubmit={handleFormSubmit}>
				<TextField
					variant="outlined"
					margin="normal"
					label="question"
					value={poll.question}
					disabled
				/>
				{
					poll.answers.map((answer, index) => {
						return (
							<Grid
								key={answer._id}
								container
								alignItems="center"
								spacing={2}
							>
								<Grid item>
									<TextField
										variant="outlined"
										margin="normal"
										label={`Answer #${index + 1}`}
										value={answer.value}
										disabled
									/>
								</Grid>
							</Grid>
						);
					})
				}
				{
					answers.map((answer, index) => {
						return (
							<Grid
								key={answer._id}
								container
								alignItems="center"
								spacing={2}
							>
								<Grid item>
									<TextField
										variant="outlined"
										margin="normal"
										label={`Answer #${poll.answers.length + index + 1}`}
										value={answer.value}
										required
										onChange={e => handleAnswersChange(e, index)}
									/>
								</Grid>
								<Grid item>
									<ClearIcon
										fontSize="large"
										onClick={() => removeAnswer(answer._id)}
									/>
								</Grid>
							</Grid>
						);
					})
				}
				<div>
					<Icon fontSize="large" onClick={addAnswer}>add_box</Icon>
				</div>
				<div>
					<Button
						type="submit"
						variant="contained"
						color="primary"
					>
						Submit Changes
					</Button>
				</div>
			</form>
			<div>
				<Button
					variant="contained"
					color="secondary"
					onClick={deletePoll}
				>
					Delete Poll
				</Button>
			</div>
		</Container>
		</>
	);
};
PollEditor.propTypes = {
	match: PropTypes.object,
	loggedUser: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
	return {
		loggedUser: state.loggedUser
	};
};

export default connect(mapStateToProps)(PollEditor);
