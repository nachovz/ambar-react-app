import React, { Fragment } from 'react';
import { withRouter } from "react-router";
import { useRutasContext } from 'app/contexts/Rutas';
import List from 'app/components/ui/List';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import DateBar from 'app/components/ui/DateBar';
import TopBar from 'app/components/ui/TopBar';
import StepNavigator from 'app/components/app/StepNavigator';

const CartaPorteClient = ({ history }) => {
  const [{ selected }] = useRutasContext();

  if (!selected) {
    history.push('/');
    return null;
  }

  const moveBack = () => history.push('cartaporte');
  const {
    serviceAddressName,
    serviceAddress,
    clientPhone,
    clientEmail,
    clientVat,
    clientTimeTable
  } = selected;

  return (
    <Fragment>
      <TopBar title="DATOS DEL CLIENTE" />
      <DateBar title={`FECHA RECOGIDA: ${selected.serviceDateTime}`} />
      <List>
        <TextListElement
          informative
          icon="usuario"
          title="Nombre de la empresa"
          subtitle={serviceAddressName}
        />
        <TextListElement
          informative
          icon="direccion"
          title="Dirección"
          subtitle={serviceAddress}
          actionIcon="place"
        />
        {!!clientPhone &&
          <TextListElement
            informative
            title="Teléfono Móvil"
            subtitle={clientPhone}
            actionIcon="movil"
          />
        }
        {!!clientEmail &&
          <TextListElement
            informative
            title="Email"
            subtitle={clientEmail}
            actionIcon="mail"
          />
        }
        {!!clientVat &&
          <TextListElement
            informative
            icon="cif"
            title="CIF"
            subtitle={clientVat}
          />
        }
        {!!clientTimeTable &&
          <TextListElement
            informative
            icon="calendario"
            title="Horario"
            subtitle={clientTimeTable}
          />
        }
      </List>
      <StepNavigator
        moveToPreviousText="Carta de Porte"
        moveToPreviousAction={moveBack}
        moveToNextText=""
      />
    </Fragment>
  );
};

export default withRouter(CartaPorteClient);
