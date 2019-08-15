import React from 'react';
import { storiesOf } from '@storybook/react';
import DateBar from '../';

import List from 'app/components/ui/List';

storiesOf('DateBar', module)
  .add('Default', () => (
    <List>
      <DateBar title="FECHA REGOGIDA: 5 Febrero 2019" />
    </List>
  ))
  .add('With rightText', () => (
    <List>
      <DateBar
        title="Title"
        rightText="rightText"
      />
    </List>
  ));