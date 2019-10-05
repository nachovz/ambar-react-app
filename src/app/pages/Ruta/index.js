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

  const showInfo = (selected) => () => {
    setRutasState({ ...rutas, selected });
    history.push("/quickview");
  };

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
          icon="mantenimiento"
          title={orders[order].name}
          subtitle={orders[order].pickup.location.address}
          subtitle2=""
          actionIcon="estado-aviso"
          action={showInfo(orders[order])}
          onClick={() => history.push("/cartaporte")}
        />
      ))}
    </List>
  );
};

export default withRouter(Ruta);
