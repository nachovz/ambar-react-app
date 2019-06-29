import { configure } from '@storybook/react';

// Automatically import all files ending in *.stories.js
const req = require.context("../src", true, /.stories.js$/);
const loadStories = () => {
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);
