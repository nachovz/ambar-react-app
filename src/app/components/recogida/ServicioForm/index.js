import React from 'react';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import TextField from 'app/components/form/TextField';
import BoxedInput from 'app/components/form/BoxedInput';
import Switch from 'app/components/form/Switch';
import FieldListElement from 'app/components/ui/ListElement/FieldListElement';
import { TIPOS_RECOGIDAS } from 'app/constants/values';

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
      <TextListElement
        noDivider
        iconColor="primary"
        icon={TIPOS_RECOGIDAS[selectedRecogida.projCategoryId]}
        title={selectedRecogida.itemName}
        subtitle={selectedRecogida.itemId}
      />
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