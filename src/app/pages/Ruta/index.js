import React from 'react';
import { withRouter } from "react-router";
import List from 'app/components/ui/List';
import TopBar from 'app/components/ui/TopBar';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import { RUTA } from 'app/constants/values';

const Ruta = ({ history }) => (
  <List>
    <TopBar
      title={`Total avisos: ${RUTA.length}`}
      rightText="29 Jul 2019"
    />
    {RUTA.map((stop, index) => (
      <TextListElement
        key={index}
        button
        icon="mantenimiento"
        title="(VM) Talleres Mariscal Automotriz Nombre Largo"
        subtitle="C/ Joaquín Sorolla, 51"
        subtitle2="28522 Rivas Vacia Madrid"
        actionIcon="estado-aviso"
        action={() => history.push("/quickview")}
        onClick={() => history.push("/cartaporte")}
      />
    ))}

  </List>
);

export default withRouter(Ruta);
