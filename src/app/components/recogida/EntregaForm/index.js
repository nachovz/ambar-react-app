import React from 'react';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import TextField from 'app/components/form/TextField';
import BoxedInput from 'app/components/form/BoxedInput';
import { TIPOS_RECOGIDAS } from 'app/constants/values';

const EntregaForm = ({
  selectedRecogida,
  register,
  errors
}) => {

  return(
    <React.Fragment>
      <TextListElement
        noDivider
        iconColor="primary"
        icon={TIPOS_RECOGIDAS[selectedRecogida.projCategoryId]}
        title={selectedRecogida.itemName}
        subtitle={selectedRecogida.itemId}
      />
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
    </React.Fragment>
  )
}

export default EntregaForm;