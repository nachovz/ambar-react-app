import React from 'react';
import { withRouter } from "react-router";
import { Redirect } from 'react-router';
import { useRutasContext } from 'app/contexts/Rutas';
import List from 'app/components/ui/List';
import TopBar from 'app/components/ui/TopBar';
import TextListElement from 'app/components/ui/ListElement/TextListElement';

const Ruta = ({ history }) => {
  const [rutas, setRutasState] = useRutasContext();
  const { orders } = rutas;

  if (!orders) return <Redirect to="/login" />;

  const showInfo = (selected, route, done=false) => () => {
    setRutasState({
      ...rutas,
      selected:{
        ...selected
      }
    });
    history.push(!!done ? '/resumen-dia' : route);
  };

  console.log(rutas);

  const ordersKeys = Object.keys(orders);

  return (
    <List>
      <TopBar
        title={`Total avisos: ${ordersKeys.lenght}`}
        rightText="29 Jul 2019"
      />
      {ordersKeys.map((order, index) => (
        <TextListElement
          key={index}
          button
          disabled={orders[order].done}
          icon="mantenimiento"
          title={orders[order].name}
          subtitle={orders[order].pickup.location.address}
          subtitle2=""
          actionIcon={orders[order].done ? "ver" : "estado-aviso"}
          action={showInfo(orders[order], "/quickview",orders[order].done)}
          onClick={showInfo(orders[order],"/cartaporte",orders[order].done)}
        />
      ))}
    </List>
  );
};

export default withRouter(Ruta);
