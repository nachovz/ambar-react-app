import React from 'react';
import { withRouter } from "react-router";
import List from 'app/components/ui/List';
import DataListElement from 'app/components/ui/ListElement/DataListElement';
import DateBar from 'app/components/ui/DateBar';
import TopBar from 'app/components/ui/TopBar';
import Fab from 'app/components/ui/Fab';
import Icon from 'app/components/ui/Icon';
import StepNavigator from 'app/components/app/StepNavigator';

const CartaPorteSummary = ({ history }) => {
  const moveBack = () => history.goBack();
  const moveNext = () => history.push('cartaporte');

  return(
    <React.Fragment>
      <List>
        <TopBar title="CARTA DE PORTE No 198044_amb" />
        <DateBar title="FECHA RECOGIDA: 29 Agosto 2019" />
        <DataListElement
          informative
          noIcon
          title="Residuos Recogidos"
          quantities={ ["Ud.", "Kg."] }
          actionIcon="estado-aviso"
        />
        <DataListElement
          icon="lista-diferente"
          iconColor="error"
          title="16060100"
          subtitle="RP_Baterías de plomo"
          quantities={[5, -20]}
          actionIcon="editar"
          action={() => history.push("/recogida")}
        />
        <DataListElement
          icon="lista-correcta"
          iconColor="primary"
          title="16060100"
          subtitle="RP_Baterías de plomo"
          quantities={[10, -22]}
          actionIcon="editar"
          action={() => history.push("/recogida")}
        />
        <DataListElement
          icon="lista-manual"
          iconColor="secondary"
          title="16060100"
          subtitle="RP_Baterías de plomo"
          quantities={[2, -16]}
          actionIcon="editar"
          action={() => history.push("/recogida")}
        />
      </List>
      <Fab
        color="primary"
        aria-label="Nuevo"
        onClick={() => history.push("/recogida-add")}
      >
        <Icon />
      </Fab>
      <StepNavigator
        moveToPreviousText="Atrás"
        moveToPreviousAction={moveBack}
        moveToNextText="Firma cliente"
        moveToNextAction={moveNext}
      />
    </React.Fragment>
  );
}

export default withRouter(CartaPorteSummary);
