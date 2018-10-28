import React from "react";
import { compose, lifecycle } from "recompose";
import { Redirect, withRouter } from "react-router";

import {
	getSession,
	loadUserFromToken as loadUserFromTokenAction
} from "../actions/session";
import mapper from "../utils/connect";
import { selectIsLoggedIn, selectSessionLoaded } from "../selectors";

import Loading from "../components/Loading";

/**
 * This HOC provides a component wrapped with a loader. Needs a "loaded" prop
 * @param Component
 * @returns {*}
 */
export default Component => {
	const LoaderHOC = (props) => {
		console.log(props);
		return props.loaded ? <Component  {...props} /> : "Loading..."
	};
	return compose(
	)(LoaderHOC);
};