import React from 'react';
import { storiesOf } from '@storybook/react';
import TextField from 'app/components/form/TextField';
import SelectField from 'app/components/form/SelectField';

import BoxedInput from '../';

storiesOf('BoxedInput', module)
  .add('Primary', () => (
    <BoxedInput
      bottomLabel="UND. REAL"
      type="number"
     />
  ))
  .add('Grouped', () => (
    <BoxedInputContainer />
  ));

  const BoxedInputContainer = () => {
    const [values, setValues] = React.useState({
      unidadesreal: 0,
      pesoReal: 1
    });

    const handleChange = (name) => ({ target: { value }}) => {
      setValues({...values, [name]: value});
    };

    return(
      <React.Fragment>
        <BoxedInput
          topLabel="Und."
          topValue="8370"
          bottomLabel="UND. REAL"
          icon="unidades"
          input={
            <TextField
              name="unidadesreal"
              type="number"
              placeholder="22"
              value={values.unidadesreal}
              onChange={handleChange('unidadesreal')}
            />
          }
        />
        <BoxedInput
          topLabel="Kg"
          topValue="-10"
          bottomLabel="KG. REAL"
          type="number"
          icon="peso"
          input={
            <SelectField
              name="pesoReal"
              type="number"
              placeholder="22"
              value={values.pesoReal}
              onChange={handleChange('pesoReal')}
              options={[
                {
                  label: "Primero",
                  value: 1
                },{
                  label: "Segundo",
                  value: 2
                },{
                  label: "Tercero",
                  value: 3
                },{
                  label: "Cuarto",
                  value: 4
                }
              ]}
            />
          }
        />
    </React.Fragment>
    )
  }