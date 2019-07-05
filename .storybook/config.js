import { configure, addDecorator } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import theme from 'app/styles/material';

addDecorator( muiTheme([theme]));

// Automatically import all files ending in *.stories.js
const req = require.context("../src", true, /.stories.js$/);
const loadStories = () => {
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);
