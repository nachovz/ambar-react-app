import React from 'react';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import TextField from 'app/components/form/TextField';
import SelectField from 'app/components/form/SelectField';
import BoxedInput from 'app/components/form/BoxedInput';
import { PESO_OPTIONS } from 'app/constants/values';
import { BlueCenteredText } from './elements';
import { esIntlFormatter } from 'app/utils/esIntlFormatter';

const RecogidaForm = ({
  selectedRecogida,
  register,
  errors,
  handleMultiChange,
  kgValue,
  getValues,
  watch
}) => {
  const unidadesReal =  watch('unidadesReal');
  return(
  <React.Fragment>
    <BoxedInput
      topLabel={
        <React.Fragment>
          <strong>{selectedRecogida.weight}</strong> Kgs./Lts.*
          <br/>
          por <strong>(1)</strong> unidad
        </React.Fragment>
      }
      icon="envase"
      iconColor="primary"
      input={
        <TextListElement
          disableGutters
          noDivider
          noIcon
          title={selectedRecogida.packingMaterialName}
          subtitle={selectedRecogida.res_InventPackingMaterialCode}
        />
      }
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
    {unidadesReal>0 && 
      <BlueCenteredText>
        La <strong>MEDIDA TOTAL</strong> sería de: <strong>{esIntlFormatter.format(parseFloat((selectedRecogida.weight || "0").replace(',', '.')) * parseInt( unidadesReal ) * (kgValue/100))}</strong> Kgs./Lts.*
      </BlueCenteredText>
    }
    <TextListElement
      noDivider
      informative
      noIcon
      subtitle="*La medida Kgs (kilogramos) es aplicada a los residuos sólidos, la medida Lts (litros) es aplicada a los residuos líquidos)"
    />
  </React.Fragment>
);
  }
export default RecogidaForm;
