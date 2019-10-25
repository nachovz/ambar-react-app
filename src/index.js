import React from 'react';
import ReactDOM from 'react-dom';
import Routes from 'app/routes';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { MuiThemeProvider } from '@material-ui/core/styles';
import * as Sentry from '@sentry/browser';
import theme from 'app/styles/material';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as serviceWorker from './serviceWorker';

// css
import 'app/css/reset.css';
import 'typeface-roboto';

const engine = new Styletron();
Sentry.init({
  dsn: "https://9a5b66bb769f4aec8ba0f1aa6d5a27ee@sentry.io/1512574"
});

ReactDOM.render(
  <StyletronProvider value={engine}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </MuiThemeProvider>
  </StyletronProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
