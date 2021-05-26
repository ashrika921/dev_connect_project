import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function PrivateRoute({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateTorProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateTorProps)(PrivateRoute);
