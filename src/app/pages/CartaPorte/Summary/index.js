import React from 'react';
import { withRouter } from "react-router";
import { useRutasContext } from 'app/contexts/Rutas';
import DateBar from 'app/components/ui/DateBar';
import TopBar from 'app/components/ui/TopBar';
import Fab from 'app/components/ui/Fab';
import Icon from 'app/components/ui/Icon';
import StepNavigator from 'app/components/app/StepNavigator';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import { findRecogidaType, getRecogidaTypes } from 'app/constants/values';
import RecogidaGroupedTable from 'app/components/data/RecogidaGroupedTable';

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

  const filtered = selected.data.filter( (r) => 
    (!!r.done || findRecogidaType(r.projcategoryid) === "servicio")
  );

  return(
    <React.Fragment>
      <TopBar title={`CARTA DE PORTE No ${selected.serviceorderid}`} />
      <DateBar title={`FECHA RECOGIDA: ${selected.servicedatetime}`} />
      {!!filtered && filtered.length > 0 ? 
          getRecogidaTypes()
          .map( type => 
            <RecogidaGroupedTable 
              key={type} 
              type={type} 
              recogidas={filtered} 
              onSelectedRecogida={onSelectedRecogida}
            />
          )
        :
          <TextListElement
            subtitle="Error al cargar las recogidas. Contactar oficina."
          />
      }
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