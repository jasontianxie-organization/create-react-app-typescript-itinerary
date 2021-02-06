import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { connect } from "react-redux";

interface IHeaderprops {
  userData: {
    name: string,
    email: string,
  };
  [props: string]: any;
}

// function PrivateRoute({ children, ...rest }) {
const PrivateRoute: React.FC<IHeaderprops> =  ({children, userData, ...rest}) => {
  const location = useLocation();
  return (
    userData ? <Route {...rest}>{children}</Route> : <Redirect to={`/signin?redirect=${location.pathname}`}/>
  );
};

function mapStateToProps(state: any) {
  return {
    userData: state.users.data,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
