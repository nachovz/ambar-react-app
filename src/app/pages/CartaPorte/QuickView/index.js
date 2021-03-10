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
  LINK_TYPE_EMAIL,
	LINK_TYPE_GEO
} from 'app/constants/values';

const CartaPorteQuickView = ({ history }) => {
  const [{ selected }] = useRutasContext();

  if (!selected) {
    history.push('/');
    return null;
  }

  const {
    data,
    clientphone,
    serviceaddressname,
    serviceaddress,
    clientemail,
    clientvat,
    clienttimetable,
    officenotes,
		latitudestart,
		longitudestart
  } = selected;

  const containersDictionary = dictionaryGenerator(data, "res_inventpackingmaterialcode", "res_qty_env");
  const containerKeys = Object.keys(containersDictionary);

  const moveNext = () => {
    history.push("/cartaporte");
  }

  const moveBack = () => {
    history.push("/");
  }

	const getMapAction = function () {
		if (isValidGeo()) {
			return openLink(LINK_TYPE_GEO, `${latitudestart},${longitudestart}`)
		} else {
			return openLink(LINK_TYPE_MAP, serviceaddress.replace(/\r?\n|\r/g, ' '))
		}
	}

	const isValidGeo = function () {
		return (latitudestart && longitudestart)
	}

  return (
    <React.Fragment>
      <QuickLinks
        mobile={clientphone}
        mobileAction={() => openLink(LINK_TYPE_PHONE, clientphone)}
        mainAction={moveNext}
      />
      <List>
        <TextListElement
          informative
          icon="usuario"
          title="Nombre de la empresa"
          subtitle={serviceaddressname}
        />
        <TextListElement
          informative
          icon="direccion"
          title={`Dirección ${!isValidGeo() ? '(aproximada)' : ''}`}
          subtitle={serviceaddress}
          actionIcon="place"
          action={getMapAction}
        />
        {!!clientphone &&
          <TextListElement
            informative
            icon="movil"
            title="Teléfono Móvil"
            subtitle={clientphone}
            actionIcon="movil"
            action={() => openLink(LINK_TYPE_PHONE, clientphone)}
          />
        }
        {!!clientemail &&
          <TextListElement
            informative
            icon="mail"
            title="Email"
            subtitle={clientemail}
            actionIcon="mail"
            action={() => openLink(LINK_TYPE_EMAIL, clientemail)}
          />
        }
        {!!clientvat &&
          <TextListElement
            informative
            icon="cif"
            title="CIF"
            subtitle={clientvat}
          />
        }
        {!!clienttimetable &&
          <TextListElement
            informative
            icon="calendario"
            title="Horario"
            subtitle={clienttimetable}
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
        {!!officenotes &&
          <TextListElement
            noDivider
            informative
            icon="observaciones"
            title="Observaciones Oficina"
            subtitle={officenotes}
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
