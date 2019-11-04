import React from 'react';
import { getAccessToken } from 'app/utils/auth/userSession';
import { useUserContext } from 'app/contexts/User';
import SessionListener from 'app/components/containers/SessionListener';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [{ isAuthenticated }, setUserState] = useUserContext();
  const token = getAccessToken();

  if (!isAuthenticated && token) setUserState({ isAuthenticated: true });

  return (
    <Route {...rest} render={(props) => (
      isAuthenticated ? (
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
