import React from 'react';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import TextField from 'app/components/form/TextField';
import SelectField from 'app/components/form/SelectField';
import BoxedInput from 'app/components/form/BoxedInput';
import { PESO_OPTIONS } from 'app/constants/values';

const RecogidaForm = ({
  selectedRecogida,
  register,
  errors,
  handleMultiChange,
  kgValue
}) => (
  <React.Fragment>
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
);

export default RecogidaForm;
