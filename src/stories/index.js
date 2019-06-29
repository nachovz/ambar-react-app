import React from 'react';

import { storiesOf } from '@storybook/react';

import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../styles/material';

import ButtonUI from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

storiesOf('Buttons', module)
  .addDecorator(muiTheme([theme]))
  .add('Primary', () =>(
    <ButtonUI variant="contained" color="primary">
      Hello World
    </ButtonUI>
  ))
  .add('Secondary', () =>(
    <ButtonUI variant="contained" color="secondary">
      Hello World
    </ButtonUI>
  ));

storiesOf('FAB', module)
  .addDecorator(muiTheme([theme]))
  .add('Primary', () => (
    <Fab color="primary" aria-label="Add">
      <AddIcon />
    </Fab>
  ))
  .add('Secondary', () => (
    <Fab color="secondary" aria-label="Add">
      <AddIcon />
    </Fab>
  ));


