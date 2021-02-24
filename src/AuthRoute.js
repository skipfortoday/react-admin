import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";
import { AuthContext } from '../App';

const AuthRoute = props => {
  const {state} = useContext(AuthContext)
  if (!state.isAuthenticated) return <Redirect to="/" />;
  return <Route {...props} />;
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Login.isAuthenticated,
  };
};

export default connect(mapStateToProps)(AuthRoute);