import React from 'react';
import { storiesOf } from '@storybook/react';

import Fab from '../';
import AddIcon from '@material-ui/icons/Add';//USE LOCAL

storiesOf('FAB', module)
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


