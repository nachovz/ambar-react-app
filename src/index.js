import React from 'react';
import ReactDOM from 'react-dom';
import Routes from 'app/routes';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'app/styles/material';
import * as serviceWorker from './serviceWorker';

const engine = new Styletron();

ReactDOM.render(
  <StyletronProvider value={engine}>
    <MuiThemeProvider theme={theme}>
      <Routes />
    </MuiThemeProvider>
  </StyletronProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
