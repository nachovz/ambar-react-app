import React from 'react';
import { withRouter } from "react-router";
import { useRutasContext } from 'app/contexts/Rutas';
import DateBar from 'app/components/ui/DateBar';
import TopBar from 'app/components/ui/TopBar';
import Fab from 'app/components/ui/Fab';
import Icon from 'app/components/ui/Icon';
import StepNavigator from 'app/components/app/StepNavigator';
import Table from 'app/components/ui/Table';
import TableElement from 'app/components/ui/Table/TableElement';
import { TIPOS_RECOGIDAS } from 'app/constants/values';
import { esIntlFormatter } from 'app/utils/esIntlFormatter';

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
    (!!r.done || TIPOS_RECOGIDAS[r.projCategoryId] === "servicio")
  );

  return(
    <React.Fragment>
      <TopBar title={`CARTA DE PORTE No ${selected.serviceOrderId}`} />
      <DateBar title={`FECHA RECOGIDA: ${selected.serviceDateTime}`} />
      <Table
        title={'Elemento/Código'}
        size="small"
        headers={[
          'Cantidad', 
          'Kgs./Lts.', 
          <Icon
            icon="estado-aviso"
            color="primary"
            fontSize="small"
          />
        ]}
      >
        {filtered.length > 0 ?
          filtered.map( (rec, ind) =>{
            const {
              itemId,
              itemName,
              kgReal,
              unidadesReal,
              projCategoryId,
              weight,
              qty,
              servicioRealizado
            } = rec;
            const typeEntrega = TIPOS_RECOGIDAS[projCategoryId] === 'entrega';
            let calc = '';
            switch(TIPOS_RECOGIDAS[projCategoryId]){
              case 'recogida':
                calc = (esIntlFormatter.format(parseFloat((weight || "0").replace(',', '.')) * parseInt( unidadesReal ) * (kgReal/100)));
                break;
              case 'entrega':
                calc = (esIntlFormatter.format(parseFloat(qty) * parseInt( unidadesReal )));
                break;
              case 'servicio':
                calc = servicioRealizado ? 'REALIZADO' : 'NO REALIZADO';
                break;
              default:
                calc = 'N/A';
                break;
            };
            const qts = [
              typeEntrega ? unidadesReal : "",
              calc
            ];
            return(
              <TableElement
                key={ind}
                title={itemName}
                subtitle={itemId}
                cells={qts}
                actionIcon="editar"
                action={onSelectedRecogida(rec)}
              />
            )
          })
        :
          <TableElement
            title="No hay elementos cerrados"
          />
        }
      </Table>
      
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