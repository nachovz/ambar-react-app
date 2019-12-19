import React from 'react';
import { withRouter } from "react-router";
import { useRutasContext } from 'app/contexts/Rutas';
import List from 'app/components/ui/List';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import QuickLinks from 'app/components/ui/QuickLinks';
import Typography from 'app/components/ui/Typography';
import StepNavigator from 'app/components/app/StepNavigator';
import dictionaryGenerator from 'app/utils/dictionaryGenerator';
import { openLink } from 'app/utils/openLink';
import {
  LINK_TYPE_MAP,
  LINK_TYPE_PHONE,
  LINK_TYPE_EMAIL
} from 'app/constants/values';

const CartaPorteQuickView = ({ history }) => {
  const [{ selected }] = useRutasContext();

  if (!selected) {
    history.push('/');
    return null;
  }

  const {
    data,
    ClientPhone,
    ServiceAddressName,
    ServiceAddress,
    ClientEmail,
    ClientVat,
    ClientTimeTable,
    officeNotes
  } = selected;

  const containersDictionary = dictionaryGenerator(data, "Res_InventPackingMaterialCode", "Res_Qty_Env");
  const containerKeys = Object.keys(containersDictionary);

  const moveNext = () => {
    history.push("/cartaporte");
  }

  const moveBack = () => {
    history.push("/");
  }

  return (
    <React.Fragment>
      <QuickLinks
        mobile={ClientPhone}
        mobileAction={() => openLink(LINK_TYPE_PHONE, ClientPhone)}
        mainAction={moveNext}
      />
      <List>
        <TextListElement
          informative
          icon="usuario"
          title="Nombre de la empresa"
          subtitle={ServiceAddressName}
        />
        <TextListElement
          informative
          icon="direccion"
          title="Dirección"
          subtitle={ServiceAddress}
          actionIcon="place"
          action={() => openLink(LINK_TYPE_MAP,ServiceAddress)}
        />
        {!!ClientPhone &&
          <TextListElement
            informative
            icon="movil"
            title="Teléfono Móvil"
            subtitle={ClientPhone}
            actionIcon="movil"
            action={() => openLink(LINK_TYPE_PHONE, ClientPhone)}
          />
        }
        {!!ClientEmail &&
          <TextListElement
            informative
            icon="mail"
            title="Email"
            subtitle={ClientEmail}
            actionIcon="mail"
            action={() => openLink(LINK_TYPE_EMAIL, ClientEmail)}
          />
        }
        {!!ClientVat &&
          <TextListElement
            informative
            icon="cif"
            title="CIF"
            subtitle={ClientVat}
          />
        }
        {!!ClientTimeTable &&
          <TextListElement
            informative
            icon="calendario"
            title="Horario"
            subtitle={ClientTimeTable}
          />
        }
        <TextListElement
          noDivider
          icon="mantenimiento"
          title="Carta de Porte"
          subtitle={`Total ${data.length} líneas`}
        />
        <TextListElement
          noDivider
          icon="envase"
          title="Previsión de Envases"
          secondaryText={
            <React.Fragment>
              {containerKeys.map( container => (
                <Typography key={container} variant="body2" color="textSecondary">
                  {container} x {containersDictionary[container].Qty} Und.
                </Typography>
              ))}
            </React.Fragment>
          }
        />
        {!!officeNotes &&
          <TextListElement
            noDivider
            informative
            icon="observaciones"
            title="Observaciones Oficina"
            subtitle={officeNotes}
          />
        }
      </List>
      <StepNavigator
        moveToPreviousText="Ruta"
        moveToPreviousAction={moveBack}
        moveToNextText="Carta de Porte"
        moveToNextAction={moveNext}
      />
    </React.Fragment>
  );
};


export default withRouter(CartaPorteQuickView);
