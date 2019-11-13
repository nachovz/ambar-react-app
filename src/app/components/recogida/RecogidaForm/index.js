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
      topLabel="Und."
      topValue={selectedRecogida.res_Qty_Env}
      icon="unidades"
      input={
        <TextField
          register={register}
          noMargin
          name="unidadesReal"
          type="number"
          placeholder="UNIDADES REAL"
          error={errors.unidadesReal}
        />
      }
    />
    <BoxedInput
      icon="peso"
      input={
        <SelectField
          name="kgReal"
          value={kgValue}
          options={PESO_OPTIONS}
          onChange={handleMultiChange}
          helperText="PESO REAL ESTIMADO"
        />
      }
    />
    <TextListElement
      noDivider
      informative
      noIcon
      subtitle="*La medida Kgs (kilogramos) es aplicada a los residuos sólidos, la medida Lts (litros) es aplicada a los residuos líquidos)"
    />
  </React.Fragment>
);

export default RecogidaForm;
