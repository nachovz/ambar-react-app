import React from 'react';
import { storiesOf } from '@storybook/react';

import QuickLinks from '../';

storiesOf('QuickLinks', module)
  .add('Default', () => (
    <QuickLinks
      phone="888 999 00 44"
      mobile="888 999 00 44"
    />
  ));