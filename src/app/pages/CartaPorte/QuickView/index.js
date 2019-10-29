import React from 'react';
import { withRouter } from "react-router";
import { useRutasContext } from 'app/contexts/Rutas';
import List from 'app/components/ui/List';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import QuickLinks from 'app/components/ui/QuickLinks';
import Typography from 'app/components/ui/Typography';
import StepNavigator from 'app/components/app/StepNavigator';
import dictionaryGenerator from 'app/utils/dictionaryGenerator';

const CartaPorteQuickView = ({ history }) => {
  const [{ selected }] = useRutasContext();

  if (!selected) {
    history.push('/');
    return null;
  }
  const containersDictionary = dictionaryGenerator(selected.data, "res_InventPackingMaterialCode", "res_Qty_Env");
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
        mobile={selected.clientPhone}
        mainAction={moveNext}
      />
      <List>
        <TextListElement
          noDivider
          informative
          title={selected.serviceAddressName}
          subtitle={selected.serviceAddress}
          actionIcon="place"
          action={() => console.log("Action: open Maps")}
        />
        <TextListElement
          noDivider
          title="Carta de Porte"
          subtitle={`Total ${selected.data.length} líneas`}
        />
        <TextListElement
          noDivider
          title="Previsión de Envases"
          secondaryText={
            <React.Fragment>
              {containerKeys.map( container => (
                <Typography key={container} variant="body2" color="textSecondary">
                  {container} x {containersDictionary[container].qty} Und.
                </Typography>
              ))}
            </React.Fragment>
          }
        />
        <TextListElement
          noDivider
          informative
          title="Observaciones de Oficina"
          subtitle="Nunc erat dolor, gravida vel tincidunt eu, accumsan sed magna. Proin sit amet lorem vitae tortor eleifend semper eu non turpis. Sed at orci ullamcorper, varius mi quis, auctor magna."
        />
        <TextListElement
          noDivider
          title="Recogida Anulada"
          subtitle="Vehículo lleno"
        />
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
