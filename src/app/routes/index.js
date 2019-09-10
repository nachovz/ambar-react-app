import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import App from 'app/components/containers/App';
import LoadingIndicator from 'app/components/app/LoadingIndicator';
import LoadingOverlay from 'app/components/ui/LoadingOverlay';
import PrivateRoutes from './PrivateRoutes';

const Login = Loadable({
  loading: LoadingOverlay,
  timeout: 15000,
  loader: () => import(/* webpackChunkName: 'Login' */ 'app/pages/Login')
});

const routes = [
  {
    path: '/login',
    public: true,
    component: Login
  }
];

const Routes = () => (
  <Router>
    <App>
      {routes.map((route, index) => {
        return <Route key={index} exact {...route} />
      })}
      <PrivateRoutes />
      <LoadingIndicator />
    </App>
  </Router>
);

export default Routes;
