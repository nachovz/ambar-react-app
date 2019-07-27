import React from 'react';
import { storiesOf } from '@storybook/react';
import Row from 'app/components/ui/Row';

import BoxedInput from '../';

storiesOf('BoxedInput', module)
  .add('Primary', () => (
    <BoxedInput
      customLabel="UND. REAL"
      type="number"
     />
  ))
  .add('Grouped', () => (
    <Row centered>
      <BoxedInput
        customLabel="UND. REAL"
        type="number"
        placeholder="22"
      />
      <BoxedInput
        customLabel="KG. REAL"
        type="number"
      />
    </Row>
  ));