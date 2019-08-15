import React, { Fragment } from 'react';
import { withRouter } from "react-router";
import List from 'app/components/ui/List';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import DateBar from 'app/components/ui/DateBar';
import TopBar from 'app/components/ui/TopBar';
import StepNavigator from 'app/components/app/StepNavigator';

const CartaPorteClient = ({ history }) => {
  const moveBack = () => history.goBack();
  const moveNext = () => history.push('cartaporte');

  return (
    <Fragment>
      <List>
        <TopBar title="DATOS DEL CLIENTE" />
        <DateBar title="FECHA RECOGIDA: 29 Agosto 2019" />
        <TextListElement
          informative
          icon="usuario"
          title="Nombre de la empresa"
          subtitle="(VM) Talleres Mariscal Automotriz Nombre Largo"
        />
        <TextListElement
          informative
          icon="direccion"
          title="Dirección"
          subtitle="C/ Joaquín Sorolla, 51"
          subtitle2="28522 Rivas Vacia Madrid"
          actionIcon="place"
        />
        <TextListElement
          informative
          title="Teléfono fijo"
          subtitle="888 888 8888"
          actionIcon="phone"
        />
        <TextListElement
          informative
          title="Teléfono Móvil"
          subtitle="009 992 0098"
          actionIcon="movil"
        />
        <TextListElement
          informative
          title="Email"
          subtitle="correo_electrónico@email.com"
          actionIcon="mail"
        />
        <TextListElement
          informative
          icon="cif"
          title="CIF"
          subtitle="45543212V"
        />
        <TextListElement
          informative
          icon="observaciones"
          title="Observaciones Oficina"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a neque neque. Cras nec eleifend odio. Proin neque mi, elementum eu neque nec, consectetur mattis enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. In vel odio ut ipsum blandit finibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam pulvinar dui eu tempus rhoncus. Nam efficitur lacinia est id lobortis.
            Praesent ac lectus varius odio commodo aliquam in ac nisl."
        />
      </List>
      <StepNavigator
        moveToPreviousText="Atrás"
        moveToPreviousAction={moveBack}
        moveToNextText="Carta de Porte"
        moveToNextAction={moveNext}
      />
    </Fragment>
  );
};

export default withRouter(CartaPorteClient);
