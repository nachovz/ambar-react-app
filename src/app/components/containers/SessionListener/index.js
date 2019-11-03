import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useLoadingContext } from 'app/contexts/Loading';
import { getAccessToken } from 'app/utils/auth/userSession';

const SessionListener = ({ history, props, children }) => {
  const [loadingState] = useLoadingContext();

  useEffect(() => {
    if (!loadingState && !getAccessToken()) {
      history.push('/login');
    }
  }, [history, loadingState]);

  return  React.Children.map(children, child =>
    React.cloneElement(child, props)
  );
};

export default withRouter(SessionListener);
