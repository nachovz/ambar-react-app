import React from 'react';
import BoxedInput from 'app/components/form/BoxedInput';

const ConsignaForm = ({ selectedRecogida }) => (
  <React.Fragment>
    <BoxedInput
      topLabel="Und."
      input={selectedRecogida.res_qty_env}
      icon="unidades"
    />
  </React.Fragment>
);
export default ConsignaForm;
