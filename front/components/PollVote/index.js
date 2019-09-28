import React, { useState } from "react";
import PropTypes from "prop-types";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";

const PollVote = ({ answers, handleFormSubmit }) => {
	const [checkedAnswerId, setCheckedAnswerId] = useState("");
	return (
		<form onSubmit={event => handleFormSubmit(event, checkedAnswerId)}>
			<RadioGroup>
				{
					answers.map(answer => {
						return (
							<FormControlLabel
								key={answer.id}
								control={<Radio />}
								value={answer.id}
								label={answer.value}
								checked={checkedAnswerId === answer.id}
								onChange={() => setCheckedAnswerId(answer.id)}
							/>
						);
					})
				}
			</RadioGroup>
			<Button disabled={checkedAnswerId.length === 0} type="submit" variant="contained" color="primary">Submit Vote</Button>
		</form>
	);
};
PollVote.propTypes = {
	answers: PropTypes.array.required,
	handleFormSubmit: PropTypes.func.required
};

export default PollVote;
