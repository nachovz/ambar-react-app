import React from 'react';
import { withRouter } from "react-router";
import List from 'app/components/ui/List';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import FieldListElement from 'app/components/ui/ListElement/FieldListElement';
import DateBar from 'app/components/ui/DateBar';
import TopBar from 'app/components/ui/TopBar';
import TextField from 'app/components/form/TextField';
import BoxedInput from 'app/components/form/BoxedInput';
import Row from 'app/components/ui/Row';
import StepNavigator from 'app/components/app/StepNavigator';

const Recogida = ({ history }) => {
  const moveBack = () => history.goBack();
  const moveNext = () => history.push('cartaporte');

  return(
    <React.Fragment>
      <List>
        <TopBar
          title="RECOGIDA"
          actionIcon="camara"
          action={() => history.push('recogida-add-photo')}
        />
        <DateBar title="FECHA RECOGIDA: 29 Agosto 2019" />
        <TextListElement
          noDivider
          iconColor="primary"
          icon="mantenimiento"
          title="16060100"
          subtitle="RP_Baterías de plomo"
        />
        <Row centered>
          <BoxedInput
            topLabel="Und."
            topValue="8370"
            bottomLabel="UND. REAL"
            type="number"
            placeholder="22"
          />
          <BoxedInput
            topLabel="Kg"
            topValue="-10"
            bottomLabel="KG. REAL"
            type="number"
          />
        </Row>
        <FieldListElement
          title="Observaciones"
          field={
            <TextField
              fullWidth
              multiline
              placeholder="Aquí las observaciones"
            />
          }
        />
        <FieldListElement title="Imágenes" />
        <TextListElement
          noDivider
          icon="clip"
          title="img_1.jpg"
          actionIcon="papelera"
        />
        <TextListElement
          noDivider
          icon="clip"
          title="img_2.jpg"
          actionIcon="papelera"
        />
        <TextListElement
          noDivider
          icon="clip"
          title="img_3.jpg"
          actionIcon="papelera"
        />
      </List>
      <StepNavigator
        moveToPreviousText="Atrás"
        moveToPreviousAction={moveBack}
        moveToNextText="Confirmación"
        moveToNextAction={moveNext}
      />
    </React.Fragment>
  );
}

export default withRouter(Recogida);
