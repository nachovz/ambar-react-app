import React from 'react';
import { withRouter } from "react-router";
import { useRutasContext } from 'app/contexts/Rutas';
import List from 'app/components/ui/List';
import DataListElement from 'app/components/ui/ListElement/DataListElement';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
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

  const filtered = selected.data.filter( (r) => !!r.done);

  return(
    <React.Fragment>
      <TopBar title={`CARTA DE PORTE No ${selected.serviceOrderId}`} />
      <DateBar title={`FECHA RECOGIDA: ${selected.serviceDateTime}`} />
      <List>
        <DataListElement
          title="Residuos Recogidos"
          quantities={ ["Und", "%"] }
          actionIcon="estado-aviso"
        />
        {filtered.length > 0 ?
          filtered.map( (rec, ind) =>{
            const {
            itemId,
            itemName,
            kgReal,
            unidadesReal
          } = rec;
            return(
              <DataListElement
                key={ind}
                title={itemName}
                subtitle={itemId}
                quantities={[unidadesReal, `${kgReal}%`]}
                actionIcon="editar"
                action={onSelectedRecogida(rec)}
              />
            )
            })
          :
            <TextListElement
              noDivider
              title="No hay recogidas terminadas"
            />
          }
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
        moveToNextText={filtered.length > 0 && "Firma cliente"}
        moveToNextAction={moveNext}
      />
    </React.Fragment>
  );
}

export default withRouter(CartaPorteSummary);
