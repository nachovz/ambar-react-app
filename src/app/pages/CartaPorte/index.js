import React, { Fragment } from 'react';
import { withRouter } from "react-router";
import List from 'app/components/ui/List';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import DateBar from 'app/components/ui/DateBar';
import TopBar from 'app/components/ui/TopBar';
import Fab from 'app/components/ui/Fab';
import Icon from 'app/components/ui/Icon';
import StepNavigator from 'app/components/app/StepNavigator';

const CartaPorte = ({ history }) => {
  const moveTo = (route) => () => history.push(route);

  return (
    <Fragment>
      <List>
        <TopBar
          title="Carta de porte: 19844_amb"
          actionIcon="mantenimiento"
          action={() => console.log("Action: open PDF")}
        />
        <DateBar title="FECHA RECOGIDA: 29 Agosto 2019" />
        <TextListElement
          button
          iconColor="primary"
          icon="mantenimiento"
          title="16060100"
          subtitle="RP_Baterías de plomo"
          actionIcon="arrow_right"
          action={() => history.push("/recogida")}
          onClick={() => history.push("/recogida")}
        />
        <TextListElement
          button
          iconColor="primary"
          icon="mantenimiento"
          title="15020203"
          subtitle="RP_Trapos contaminados"
          actionIcon="arrow_right"
        />
        <TextListElement
          button
          iconColor="primary"
          icon="mantenimiento"
          title="16050401"
          subtitle="RP_Aerosoles y Sprais"
          actionIcon="arrow_right"
        />
        <TextListElement
          disabled
          icon="mantenimiento"
          title="16050401"
          subtitle="RP_Aerosoles y Sprais"
          actionIcon="toggle-on"
        />
        <TextListElement
          button
          iconColor="primary"
          icon="mantenimiento"
          title="15020203"
          subtitle="RP_Trapos contaminados"
          actionIcon="arrow_right"
        />
        <TextListElement
          button
          iconColor="primary"
          icon="mantenimiento"
          title="16050401"
          subtitle="RP_Aerosoles y Sprais"
          actionIcon="arrow_right"
        />
        <TextListElement
          disabled
          icon="mantenimiento"
          title="16050401"
          subtitle="RP_Aerosoles y Sprais"
          actionIcon="toggle-on"
        />
        <TextListElement
          button
          iconColor="primary"
          icon="mantenimiento"
          title="15020203"
          subtitle="RP_Trapos contaminados"
          actionIcon="arrow_right"
        />
        <TextListElement
          button
          iconColor="primary"
          icon="mantenimiento"
          title="16050401"
          subtitle="RP_Aerosoles y Sprais"
          actionIcon="arrow_right"
        />
        <TextListElement
          disabled
          icon="mantenimiento"
          title="16050401"
          subtitle="RP_Aerosoles y Sprais"
          actionIcon="toggle-on"
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
        moveToPreviousText="Datos de Usuario"
        moveToPreviousAction={moveTo('cartaporte-client')}
        moveToNextText="Resumen de Recogida"
        moveToNextAction={moveTo('cartaporte-summary')}
      />
    </Fragment>
  );
};

export default withRouter(CartaPorte);
