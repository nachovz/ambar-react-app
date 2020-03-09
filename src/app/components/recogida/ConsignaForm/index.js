import React from 'react';
import BoxedInput from 'app/components/form/BoxedInput';

const ConsignaForm = ({ selectedRecogida }) => (
  <React.Fragment>
    <BoxedInput
      topLabel="Und."
      input={selectedRecogida.Res_Qty_Env}
      icon="unidades"
    />
  </React.Fragment>
);
export default ConsignaForm;
