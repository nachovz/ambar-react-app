import React from 'react';
import TextField from 'app/components/form/TextField';
import BoxedInput from 'app/components/form/BoxedInput';
import Switch from 'app/components/form/Switch';
import FieldListElement from 'app/components/ui/ListElement/FieldListElement';

const ServicioForm = ({
  selectedRecogida,
  register,
  errors
}) => {

  const [checked, setChecked] = React.useState(false);

  const handleChange = event => {
    setChecked(event.target.checked);
  };

  return(
    <React.Fragment>
      <FieldListElement
        field={
          <Switch
            checked={checked}
            onChange={handleChange}
            value="Realizado"
            label={checked ? "Realizado":"No Realizado"}
          />
        }
      />
      {checked &&
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
      }
    </React.Fragment>
  )
}

export default ServicioForm;