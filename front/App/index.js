import { hot } from "react-hot-loader/root";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Poll from "../pages/Poll";
import PollCreator from "../pages/PollCreator";

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route path="/signin" component={Signin}/>
				<Route path="/signup" component={Signup}/>
				<Route path="/polls/new" component={PollCreator} />
				<Route path="/polls/:id" component={Poll} />
			</Switch>
		</Router>
		
	);
};

export default hot(App);
