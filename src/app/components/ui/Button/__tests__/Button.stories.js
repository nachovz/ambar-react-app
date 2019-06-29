import React from 'react';
import { storiesOf } from '@storybook/react';
import theme from '../../../../styles/material';
import {muiTheme} from 'storybook-addon-material-ui';

import Button from '../';

storiesOf('Buttons', module)
  .addDecorator(muiTheme([theme]))
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
