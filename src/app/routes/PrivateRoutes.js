import React from 'react';
import PrivateRoute from './PrivateRoute';
import Dashboard from 'app/components/containers/Dashboard';
import Loadable from 'react-loadable';
import LoadingOverlay from 'app/components/ui/LoadingOverlay';

const routes = [
  {
    path: '/',
    public: true,
    component: Loadable({
      loading: LoadingOverlay,
      timeout: 15000,
      loader: () => import(/* webpackChunkName: 'Ruta' */ 'app/pages/Ruta')
    })
  },
  {
    path: '/quickview',
    public: true,
    component: Loadable({
      loading: LoadingOverlay,
      timeout: 15000,
      loader: () => import(/* webpackChunkName: 'CartaPorteQuickView' */ 'app/pages/CartaPorte/QuickView')
    })
  },
  {
    path: '/cartaporte',
    public: true,
    component: Loadable({
      loading: LoadingOverlay,
      timeout: 15000,
      loader: () => import(/* webpackChunkName: 'CartaPorte' */ 'app/pages/CartaPorte')
    })
  },
  {
    path: '/prevision-envases',
    public: true,
    component: Loadable({
      loading: LoadingOverlay,
      timeout: 15000,
      loader: () => import(/* webpackChunkName: 'PrevisionEnvases' */ 'app/pages/PrevisionEnvases')
    })
  },
  {
    path: '/resumen-dia',
    public: true,
    component: Loadable({
      loading: LoadingOverlay,
      timeout: 15000,
      loader: () => import(/* webpackChunkName: 'ResumenDia' */ 'app/pages/ResumenDia')
    })
  },
  {
    path: '/recogida',
    public: true,
    component: Loadable({
      loading: LoadingOverlay,
      timeout: 15000,
      loader: () => import(/* webpackChunkName: 'CartaPorte' */ 'app/pages/Recogida')
    })
  },
  {
    path: '/recogida-add',
    public: true,
    component: Loadable({
      loading: LoadingOverlay,
      timeout: 15000,
      loader: () => import(/* webpackChunkName: 'CartaPorte' */ 'app/pages/Recogida/Add')
    })
  },
  {
    path: '/cartaporte-summary',
    public: true,
    component: Loadable({
      loading: LoadingOverlay,
      timeout: 15000,
      loader: () => import(/* webpackChunkName: 'CartaPorte' */ 'app/pages/CartaPorte/Summary')
    })
  },
  {
    path: '/cartaporte-client',
    public: true,
    component: Loadable({
      loading: LoadingOverlay,
      timeout: 15000,
      loader: () => import(/* webpackChunkName: 'CartaPorte' */ 'app/pages/CartaPorte/Client')
    })
  }
];

const PrivateRoutes = () => {
  return routes.map(({ component: Component, title, showBackButton, ...route}, index) => (
    <PrivateRoute key={index} exact {...route} component={(props) => (
      <Dashboard title={title}>
        <Component {...props} />
      </Dashboard>
    )} />
  ));
};

export default PrivateRoutes;
