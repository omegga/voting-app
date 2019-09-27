import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ClearIcon from "@material-ui/icons/Clear";
import ObjectID from "bson-objectid";
import axios from "axios";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

// returns a 24 character hex string
const createObjectID = () => ObjectID().str;

const createAnswer = () => {
	return { _id: createObjectID(), value: "" };
};

const createInitialAnswers = () => {
	return [
		{ _id: createObjectID(), value: "" },
		{ _id: createObjectID(), value: "" }
	];
};

const PollCreator = () => {
	const [loginError, setLoginError] = useState(false);
	const [user, setUser] = useState(null);
	const [question, setQuestion] = useState("");
	const [answers, setAnswers] = useState(createInitialAnswers);
	const [userHasSubmittedForm, setUserHasSubmittedForm] = useState(false);

	useEffect(() => {
		const loggedUserJson = localStorage.getItem("loggedUser");
		if (!loggedUserJson) {
			return setLoginError(true);
		}
		const loggedUser = JSON.parse(loggedUserJson);
		const config = {
			headers: {
				Authorization: `bearer ${loggedUser.token}`
			}
		};
		axios.post("/api/auth", {}, config)
			.then(() => {
				setUser(loggedUser);
			})
			.catch(() => {
				setLoginError(true);
			});
	}, []);

	function addAnswer() {
		setAnswers([...answers, createAnswer()]);
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

	function removeAnswer(id) {
		setAnswers(answers.filter(a => a._id !== id));
	}

	async function handleFormSubmit(event) {
		event.preventDefault();
		const config = {
			headers: {
				Authorization: `bearer ${user.token}`
			}
		};
		await axios.post("/api/polls", { question, answers }, config);
		setQuestion("");
		setAnswers(createInitialAnswers);
		setUserHasSubmittedForm(true);
	}

	if (loginError) {
		return <Redirect to="/signin" />;
	}

	if (userHasSubmittedForm) {
		return <Redirect to="/" />;
	}

	if (!user) {
		return null;
	}

	return (
		<Container>
			<Typography variant="h4">
					Create a new poll
			</Typography>
			<form onSubmit={handleFormSubmit}>
				<TextField
					variant="outlined"
					margin="normal"
					label="question"
					value={question}
					required
					onChange={e => setQuestion(e.target.value)}
				/>
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
										label={`Answer #${index + 1}`}
										value={answer.value}
										required
										onChange={e => handleAnswersChange(e, index)}
									/>
								</Grid>
								{index > 1 &&
										<Grid item>
											<ClearIcon 
												fontSize="large" 
												onClick={() => removeAnswer(answer._id)} 
											/>
										</Grid>
								}
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
PollCreator.propTypes = {
	userToken: PropTypes.string,
};

export default PollCreator;