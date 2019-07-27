import React from 'react';
import { storiesOf } from '@storybook/react';

import QuickLinks from '../';

storiesOf('QuickLinks', module)
  .add('Default', () => (
    <QuickLinks />
  ));