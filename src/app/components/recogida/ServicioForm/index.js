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
  getValues,
  watch
}) => {
  watch('servicioRealizado');
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
              setValue("servicioRealizado",e.target.checked, true);
              setValue("servicioExtraInfo",false);
              setValue("unidadesreal", "");
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
            input={{
              value: (getValues().servicioExtraInfo || false),
              onChange: (e) => {
                setValue("servicioExtraInfo",e);
                setValue("unidadesreal", "");
              }
            }}
          />
        }
      />
      <BoxedInput
        style={{
          display: ( (getValues().servicioRealizado && getValues().servicioExtraInfo) ? "flex" : "none" )
        }}
        icon="unidades"
        topLabel="Und."
        input={
          <TextField
            register={register}
            required={false}
            noMargin
            name="unidadesreal"
            type="number"
            placeholder="UNIDADES"
            error={errors.unidadesreal}
          />
        }
      />
    </React.Fragment>
  )
}

export default ServicioForm;