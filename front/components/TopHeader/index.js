import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { setLoggedUser } from "../../reducers/actions";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
	toolbarTitle: {
		flexGrow: 1,
		textDecoration: "none",
		color: "inherit"
	},
	link: {
		margin: theme.spacing(1, 1.5),
		color: "inherit",
		textDecoration: "none"
	}
}));

const TopHeader = ({ loggedUser, setLoggedUser }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	
	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	function signOut() {
		localStorage.removeItem("loggedUser");
		setLoggedUser({});
	}

	const classes = useStyles();
	return (
		<Container>
			<AppBar position="static">
				<Toolbar>
					<Link to="/" className={classes.toolbarTitle}>
						<Typography variant="h6">
							Voting App
						</Typography>
					</Link>
					{ Object.keys(loggedUser).length === 0 &&
						(
							<Link to="/signin" className={classes.link}>
								<Typography>
										LOGIN
								</Typography>
							</Link>
						)
					}
					{ Object.keys(loggedUser).length > 0 &&
						(
							<>
							<Button onClick={handleClick} className={classes.link}>
								<Typography>
									{loggedUser.username}
								</Typography>
							</Button>
							<Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
								<MenuItem onClick={handleClose}>
									<Link to="/polls/new" className={classes.link}>
										<Typography>
											New Poll
										</Typography>
									</Link>
								</MenuItem>
								<MenuItem onClick={handleClose}>
									{/* <Link to="/signin" className={classes.link}> */}
									<Button onClick={signOut} className={classes.link}>
										<Typography>
											Logout
										</Typography>
									</Button>
									{/* </Link> */}
								</MenuItem>
							</Menu>
							</>
						)
					}
				</Toolbar>
			</AppBar>
		</Container>
	);
};
TopHeader.propTypes = {
	loggedUser: PropTypes.object.isRequired,
	setLoggedUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		loggedUser: state.loggedUser
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setLoggedUser: user => {
			dispatch(setLoggedUser(user));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);
