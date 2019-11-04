import React from 'react';
import TextField from 'app/components/form/TextField';
import BoxedInput from 'app/components/form/BoxedInput';

const EntregaForm = ({
  register,
  errors
}) =>(
  <React.Fragment>
    <BoxedInput
      bottomLabel="UNIDADES"
      icon="unidades"
      input={
        <TextField
          register={register}
          name="unidadesReal"
          type="number"
          placeholder="-"
          error={errors.unidadesReal}
        />
      }
    />
  </React.Fragment>
);

export default EntregaForm;