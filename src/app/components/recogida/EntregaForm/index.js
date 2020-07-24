import React from 'react';
import TextField from 'app/components/form/TextField';
import BoxedInput from 'app/components/form/BoxedInput';

const EntregaForm = ({
  register,
  errors
}) =>(
  <React.Fragment>
    <BoxedInput
      icon="unidades"
      topLabel="Und."
      input={
        <TextField
          noMargin
          register={register}
          name="unidadesreal"
          type="number"
          placeholder="UNIDADES"
          error={errors.unidadesreal}
        />
      }
    />
  </React.Fragment>
);

export default EntregaForm;