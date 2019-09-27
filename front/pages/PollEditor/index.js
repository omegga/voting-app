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

// returns a 24 character hex string
const createObjectID = () => ObjectID().str;

const createAnswer = () => {
	return { _id: createObjectID(), value: "" };
};

const PollEditor = ({ match }) => {
	const pollId = match.params.id;
	const [poll, setPoll] = useState(null);
	const [loginError, setLoginError] = useState(false);
	const [answers, setAnswers] = useState([]);
	const [userHasSubmittedForm, setUserHasSubmittedForm] = useState(Date.now());

	useEffect(() => {
		const userJson = localStorage.getItem("loggedUser");
		if (!userJson) {
			return setLoginError(true);
		}
		const user = JSON.parse(userJson);
		const config = {
			headers: {
				Authorization: `bearer ${user.token}`
			}
		};
		axios.post(`/api/polls/${pollId}/auth`, {}, config)
			.then(({ data: pollData }) => {
				setPoll(pollData);
			})
			.catch(() => {
				setLoginError(true);
			});
	}, [pollId, userHasSubmittedForm]);

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
		const userJson = localStorage.getItem("loggedUser");
		if (!userJson) {
			return setLoginError(true);
		}
		const user = JSON.parse(userJson);
		const config = {
			headers: {
				Authorization: `bearer ${user.token}`
			}
		};
		await axios.put(`/api/polls/${pollId}`, { answers }, config);
		setAnswers([]);
		setUserHasSubmittedForm(Date.now());
	}

	if (loginError) {
		return <div>401 Unauthorized</div>;
	}

	if (!poll) {
		return <div>Loading...</div>;
	}

	return (
		<Container>
			<Typography variant="h4">
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
						Create
					</Button>
				</div>
			</form>
		</Container>
	);
};
PollEditor.propTypes = {
	match: PropTypes.object
};

export default PollEditor;