import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import App from 'app/components/containers/App';
import LoadingOverlay from 'app/components/ui/LoadingOverlay';

const Login = Loadable({
  loading: LoadingOverlay,
  timeout: 15000,
  loader: () => import(/* webpackChunkName: 'Login' */ 'app/pages/Login')
});

const Dashboard = Loadable({
  loading: LoadingOverlay,
  timeout: 15000,
  loader: () => import(/* webpackChunkName: 'Dashboard' */ 'app/components/containers/Dashboard')
});

const Ruta = Loadable({
  loading: LoadingOverlay,
  timeout: 15000,
  loader: () => import(/* webpackChunkName: 'Ruta' */ 'app/pages/Ruta')
});

const CartaPorteQuickView = Loadable({
  loading: LoadingOverlay,
  timeout: 15000,
  loader: () => import(/* webpackChunkName: 'CartaPorteQuickView' */ 'app/pages/CartaPorte/QuickView')
});

const CartaPorte = Loadable({
  loading: LoadingOverlay,
  timeout: 15000,
  loader: () => import(/* webpackChunkName: 'CartaPorte' */ 'app/pages/CartaPorte')
});

const PrevisionEnvases = Loadable({
  loading: LoadingOverlay,
  timeout: 15000,
  loader: () => import(/* webpackChunkName: 'PrevisionEnvases' */ 'app/pages/PrevisionEnvases')
});

const ResumenDia = Loadable({
  loading: LoadingOverlay,
  timeout: 15000,
  loader: () => import(/* webpackChunkName: 'ResumenDia' */ 'app/pages/ResumenDia')
});

const Recogida = Loadable({
  loading: LoadingOverlay,
  timeout: 15000,
  loader: () => import(/* webpackChunkName: 'CartaPorte' */ 'app/pages/Recogida')
});

const RecogidaAdd = Loadable({
  loading: LoadingOverlay,
  timeout: 15000,
  loader: () => import(/* webpackChunkName: 'CartaPorte' */ 'app/pages/Recogida/Add')
});

const CartaPorteSummary = Loadable({
  loading: LoadingOverlay,
  timeout: 15000,
  loader: () => import(/* webpackChunkName: 'CartaPorte' */ 'app/pages/CartaPorte/Summary')
});

const CartaPorteClient = Loadable({
  loading: LoadingOverlay,
  timeout: 15000,
  loader: () => import(/* webpackChunkName: 'CartaPorte' */ 'app/pages/CartaPorte/Client')
});


const routes = [
  {
    path: '/login',
    public: true,
    component: Login
  }
];

const dashboardRoutes = [
  {
    path: '/',
    public: true,
    component: Ruta
  },
  {
    path: '/quickview',
    public: true,
    component: CartaPorteQuickView
  },
  {
    path: '/cartaporte',
    public: true,
    component: CartaPorte
  },
  {
    path: '/prevision-envases',
    public: true,
    component: PrevisionEnvases
  },
  {
    path: '/resumen-dia',
    public: true,
    component: ResumenDia
  },
  {
    path: '/recogida',
    public: true,
    component: Recogida
  },
  {
    path: '/recogida-add',
    public: true,
    component: RecogidaAdd
  },
  {
    path: '/cartaporte-summary',
    public: true,
    component: CartaPorteSummary
  },
  {
    path: '/cartaporte-client',
    public: true,
    component: CartaPorteClient
  }
];

const Routes = () => (
  <Router>
    <App>
      {routes.map((route, index) => {
        return <Route key={index} exact {...route} />
      })}
			{dashboardRoutes.map(({ component: Component, ...route }, index) => {
				return (
					<Route key={index} exact {...route} component={() => (
						<Dashboard>
							<Component />
						</Dashboard>
					)} />
				);
			})}
    </App>
  </Router>
);

export default Routes;
