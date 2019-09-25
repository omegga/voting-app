import { hot } from "react-hot-loader/root";
import React from "react";
import { Container, Button } from "@material-ui/core";

const App = () => {
	return (
		<Container>
			<Button variant="contained" color="primary">
			Hello
			</Button>
		</Container>
	);
};

export default hot(App);
