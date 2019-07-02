import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../';

storiesOf('Buttons', module)
  .add('Primary', () =>(
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  ))
  .add('Secondary', () =>(
    <Button variant="contained" color="secondary">
      Hello World
    </Button>
  ));
