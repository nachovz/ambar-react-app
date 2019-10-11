import React from 'react';
import { withRouter } from "react-router";
import { useRutasContext } from 'app/contexts/Rutas';
import List from 'app/components/ui/List';
import DataListElement from 'app/components/ui/ListElement/DataListElement';
import DateBar from 'app/components/ui/DateBar';
import TopBar from 'app/components/ui/TopBar';
import Fab from 'app/components/ui/Fab';
import Icon from 'app/components/ui/Icon';
import StepNavigator from 'app/components/app/StepNavigator';

const CartaPorteSummary = ({ history }) => {
  const [rutas, setRutasState] = useRutasContext();
  const moveBack = () => history.goBack();
  const moveNext = () => history.push('/cartaporte-signature');

  const { selected } = rutas;
  if(!selected){
    history.push('/');
    return null;
  }

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

  return(
    <React.Fragment>
      <List>
        <TopBar title="CARTA DE PORTE No 198044_amb" />
        <DateBar title="FECHA RECOGIDA: 29 Agosto 2019" />
        <DataListElement
          title="Residuos Recogidos"
          quantities={ ["Ud.", "Kg."] }
          actionIcon="estado-aviso"
        />
        {selected.recogidas.filter( (r) => !!r.done).map( (rec, ind) =>{
          const {
          id,
          desc,
          kgReal,
          unidadesReal,
          manual
        } = rec;
          return(
            <DataListElement
              key={ind}
              title={desc}
              subtitle={id}
              quantities={[unidadesReal, `-${kgReal}`]}
              actionIcon="editar"
              action={onSelectedRecogida(rec)}
            />
          )
        })}
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
