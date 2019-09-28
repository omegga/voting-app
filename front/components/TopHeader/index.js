import React from "react";
import Container from "@material-ui/core/Container";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";

const TopHeader = () => {
	return (
		<Container>
			<Link to="/">
				<HomeIcon color="primary" />
			</Link>
		</Container>
	);
};

export default TopHeader;