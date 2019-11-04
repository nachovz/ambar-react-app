import React from 'react';
import { getAccessToken } from 'app/utils/auth/userSession';
import SessionListener from 'app/components/containers/SessionListener';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = getAccessToken();

  return (
    <Route {...rest} render={(props) => (
      !!token ? (
        <SessionListener>
          <Component {...props} />
        </SessionListener>
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )}/>
  );
};


export default PrivateRoute;
