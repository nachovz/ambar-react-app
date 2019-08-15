import React from 'react';
import { withRouter } from "react-router";
import List from 'app/components/ui/List';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import FieldListElement from 'app/components/ui/ListElement/FieldListElement';
import DateBar from 'app/components/ui/DateBar';
import TopBar from 'app/components/ui/TopBar';
import SelectField from 'app/components/form/SelectField';
import StepNavigator from 'app/components/app/StepNavigator';

const RecogidaAdd = ({ history }) => {
  const moveBack = () => history.goBack();
  const moveNext = () => history.push('recogida');
  return(
    <List>
      <TopBar title="NUEVA RECOGIDA" />
      <DateBar title="FECHA RECOGIDA: 29 Agosto 2019" />
      <TextListElement
        noDivider
        icon="mantenimiento"
        title="No 198044_amb"
        subtitle="(VM) Talleres Mariscal Automocion, S.L."
        subtitle2="25 Artículos"
      />
      <FieldListElement
        icon="empty"
        title="Familia de residuos*"
        field={
          <SelectField
            fullWidth
            value={1}
            options={[
              {
                label: "First option",
                value: 1
              }, {
                label: "Second option",
                value: 2
              }
            ]}

          />
        }
      />
      <FieldListElement
        icon="empty"
        title="Subfamilia*"
        field={
          <SelectField
            fullWidth
            value={1}
            options={[
              {
                label: "First option",
                value: 1
              }, {
                label: "Second option",
                value: 2
              }
            ]}

          />
        }
      />
      <StepNavigator
        moveToPreviousText="Atrás"
        moveToPreviousAction={moveBack}
        moveToNextText="Agregar"
        moveToNextAction={moveNext}
      />
    </List>
  );
}

export default withRouter(RecogidaAdd);
