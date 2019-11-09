import React from 'react';
import TextField from 'app/components/form/TextField';
import BoxedInput from 'app/components/form/BoxedInput';
import Switch from 'app/components/form/Switch';
import FieldListElement from 'app/components/ui/ListElement/FieldListElement';
import Checkbox from 'app/components/form/Checkbox';

const ServicioForm = ({
  selectedRecogida,
  register,
  errors,
  setValue
}) => {

  const [checked, setChecked] = React.useState(false);
  const [moreInfo, setMoreInfo] = React.useState(false);

  const handleChange = event => {
    setChecked(event.target.checked);
    setMoreInfo(false);
  };

  return(
    <React.Fragment>
      <FieldListElement
        field={
          <Switch
            name="servicioRealizado"
            checked={checked}
            onChange={handleChange}
            value="Realizado"
            label={checked ? "Realizado":"No Realizado"}
          />
        }
      />
      <FieldListElement
        field={
          <Checkbox
            name="servicioExtraInfo"
            disabled={!checked}
            color="secondary"
            label="Incluir información adicional"
            input={{
              value: moreInfo,
              onChange: () => setMoreInfo(!moreInfo)
            }}
          />
        }
      />
      {checked && moreInfo &&
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