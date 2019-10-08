import React, { Fragment } from 'react';
import { withRouter } from "react-router";
import { useRutasContext } from 'app/contexts/Rutas';
import List from 'app/components/ui/List';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import DateBar from 'app/components/ui/DateBar';
import TopBar from 'app/components/ui/TopBar';
import Fab from 'app/components/ui/Fab';
import Icon from 'app/components/ui/Icon';
import StepNavigator from 'app/components/app/StepNavigator';

const CartaPorte = ({ history }) => {
  const [rutas, setRutasState] = useRutasContext();
  const moveTo = (route) => () => history.push(route);
  const { selected } = rutas;

  if(!selected){
    history.push('/');
    return null;
  }

  console.log(rutas);

  const onSelectedRecogida = (selectedRecogida) => () => {
    setRutasState({
      ...rutas,
      selected:{
        ...selected,
        selectedRecogida
      }
    });
    history.push("/recogida");
  };

  return (
    <Fragment>
      <List>
        <TopBar
          title="Carta de porte: 19844_amb"
          actionIcon="mantenimiento"
          action={() => console.log("Action: open PDF")}
        />
        <DateBar title="FECHA RECOGIDA: 29 Agosto 2019" />
        {selected.recogidas.map( (reco,index) => (
          <TextListElement
            key={index}
            button
            iconColor="primary"
            icon="mantenimiento"
            title={reco.desc}
            subtitle={reco.id}
            actionIcon={reco.done ? "toggle-on" : "arrow_right"}
            disabled={reco.done}
            onClick={onSelectedRecogida(reco)}
            action={onSelectedRecogida(reco)}
          />
        ))}
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
