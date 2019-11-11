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
  setValue,
  getValues
}) => {

  const [checked, setChecked] = React.useState(false);
  const [moreInfo, setMoreInfo] = React.useState(false);

  React.useEffect( () => {
    
    if(!!selectedRecogida){
      const {
        servicioRealizado,
        servicioExtraInfo
      } = selectedRecogida;
      servicioRealizado && setValue("servicioRealizado", servicioRealizado);
      servicioExtraInfo && setValue("servicioExtraInfo", servicioExtraInfo);
    }
  }, [selectedRecogida, setValue]);

  console.log(getValues());
  return(
    <React.Fragment>
      <FieldListElement
        field={
          <Switch
            name="servicioRealizado"
            inputRef={register}
            checked={(getValues().servicioRealizado === 'Realizado')}
            value={(getValues().servicioRealizado || "Realizado")}
            label={getValues().servicioRealizado ? "Realizado":"No Realizado"}
            onChange={(e)=>{
              console.log(e.target.checke);
              setValue("servicioRealizado",e.target.checked);
            }}
          />
        }
      />
      <FieldListElement
        field={
          <Checkbox
            name="servicioExtraInfo"
            disabled={!getValues().servicioRealizado}
            color="secondary"
            label="Incluir información adicional"
            inputRef={register}
            value={getValues().servicioExtraInfo}
            input={{
              value: getValues().servicioExtraInfo,
              onChange: (e) => setValue("servicioExtraInfo",e)
            }}
          />
        }
      />
      {getValues().servicioRealizado && getValues().servicioExtraInfo &&
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