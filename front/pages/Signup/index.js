import React, { useState } from "react";
import { Container, TextField, Button } from "@material-ui/core";

const Signup = () => {
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	function handleFormSubmit(e) {
		e.preventDefault();
	}
	return (
		<Container>
			<form onSubmit={handleFormSubmit}>
				<TextField 
					variant="outlined"
					margin="normal"
					label="User"
					value={user}
					onChange={(e) => setUser(e.target.value)}
					name="user"
				/>
				<TextField 
					variant="outlined"
					margin="normal"
					label="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					name="password"
					type="password"
				/>
				<div>
					<Button variant="contained" color="primary" type="submit">
						Submit
					</Button>
				</div>
			</form>
		</Container>
	);
};

export default Signup;
