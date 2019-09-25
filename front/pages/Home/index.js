import React from "react";
import { Container, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<Container>
			<Link to="/signup">
				<Button variant="contained" color="primary">
					Sign up
				</Button>
			</Link>
		</Container>
	);
};

export default Home;
