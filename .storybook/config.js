import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import theme from 'app/styles/material';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as StyletronClient } from 'styletron-engine-atomic';
import CssBaseline from '@material-ui/core/CssBaseline';
import './style.css';

// Decorate with styletron and global styles
const styletron = window.styletronClient || new StyletronClient();
window.styletronClient = styletron;
addDecorator(story => (
  <React.Fragment>
    <CssBaseline/>
    <StyletronProvider value={styletron}>
      {story()}
    </StyletronProvider>
  </React.Fragment>
));

addDecorator( muiTheme([theme]));

// Automatically import all files ending in *.stories.js
const req = require.context("../src", true, /.stories.js$/);
const loadStories = () => {
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);
