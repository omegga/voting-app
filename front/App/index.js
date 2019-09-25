import { hot } from "react-hot-loader/root";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home}/>
			</Switch>
		</Router>
		
	);
};

export default hot(App);
