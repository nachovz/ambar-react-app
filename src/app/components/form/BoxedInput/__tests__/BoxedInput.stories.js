import React from 'react';
import { storiesOf } from '@storybook/react';
import Row from 'app/components/ui/Row';

import BoxedInput from '../';

storiesOf('BoxedInput', module)
  .add('Primary', () => (
    <BoxedInput
      bottomLabel="UND. REAL"
      type="number"
     />
  ))
  .add('Grouped', () => (
    <Row centered>
      <BoxedInput
        topLabel="Und."
        topValue="8370"
        bottomLabel="UND. REAL"
        type="number"
        placeholder="22"
      />
      <BoxedInput
        topLabel="Kg"
        topValue="-10"
        bottomLabel="KG. REAL"
        type="number"
      />
    </Row>
  ));