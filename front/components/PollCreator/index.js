import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import ObjectID from "bson-objectid";
import { Icon, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import PropTypes from "prop-types";

// returns a 24 character hex string
const createObjectID = () => ObjectID().str; 

const createAnswer = () => {
	return { _id: createObjectID(), value: "" };
};

const createInitialAnswers = () => {
	return [{ _id: createObjectID(), value: "" }];
};

const PollCreator = ({ userToken }) => {
	const [question, setQuestion] = useState("");
	const [answers, setAnswers] = useState(createInitialAnswers);
	
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
				Authorization: `bearer ${userToken}`
			}
		};
		await axios.post("/api/polls", { question, answers }, config);
		setQuestion("");
		setAnswers(createInitialAnswers);
	}

	return (
		<>
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
						<Grid key={answer._id} container alignItems="center" spacing={2}>
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
							{ index > 0 && 
							<Grid item>
								<ClearIcon fontSize="large" onClick={() => removeAnswer(answer._id)}/>
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
				<Button type="submit" variant="contained" color="primary">Create</Button>
			</div>
		</form>
		</>
	);
};
PollCreator.propTypes = {
	userToken: PropTypes.string
};

export default PollCreator;