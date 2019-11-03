import React from 'react';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import FieldListElement from 'app/components/ui/ListElement/FieldListElement';
import TextField from 'app/components/form/TextField';
import SelectField from 'app/components/form/SelectField';
import BoxedInput from 'app/components/form/BoxedInput';
import { PESO_OPTIONS, TIPOS_RECOGIDAS } from 'app/constants/values';

const RecogidaForm = ({
  selectedRecogida,
  register,
  errors,
  handleMultiChange,
  kgValue
}) => {
  /*const [kgValue, setKgValue] = React.useState(100);
  const { register, handleSubmit, setValue, errors } = useForm();

  React.useEffect(() => {
    register({ name: "kgReal" });
  }, [register]);

  React.useEffect( () => {
    if(!!selectedRecogida){
      const {
        kgReal,
        unidadesReal,
        observaciones
      } = selectedRecogida;
      if(!!kgReal){
        setKgValue(kgReal);
        setValue("kgReal", kgReal);
      }
      unidadesReal && setValue("unidadesReal", unidadesReal);
      observaciones && setValue("observaciones", observaciones);
    }
  }, [selectedRecogida, setValue]);

  const handleMultiChange = ({ target: { value } }) => {
    setValue("kgReal", value);
    setKgValue(value);
  }*/

  return(
    <React.Fragment>
      <TextListElement
        noDivider
        iconColor="primary"
        icon={TIPOS_RECOGIDAS[selectedRecogida.projCategoryId]}
        title={selectedRecogida.itemName}
        subtitle={selectedRecogida.itemId}
      />
      <TextListElement
        noDivider
        iconColor="primary"
        icon="envase"
        title={selectedRecogida.packingMaterialName}
        subtitle={selectedRecogida.res_InventPackingMaterialCode}
        quantities={[selectedRecogida.res_Qty_Env]}
      />
      <BoxedInput
        topLabel="Und"
        topValue={selectedRecogida.res_Qty_Env}
        bottomLabel="REAL"
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
      <BoxedInput
        topLabel={selectedRecogida.unit}
        topValue={selectedRecogida.qty}
        bottomLabel="REAL"
        icon="peso"
        input={
          <SelectField
            name="kgReal"
            value={kgValue}
            options={PESO_OPTIONS}
            onChange={handleMultiChange}
            helperText="Seleccionar %"
          />
        }
      />

    </React.Fragment>
  )
}

export default RecogidaForm;