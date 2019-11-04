import React, { Fragment } from 'react';
import { withRouter } from "react-router";
import { useRutasContext } from 'app/contexts/Rutas';
import TopBar from 'app/components/ui/TopBar';
import List from 'app/components/ui/List';
import DateBar from 'app/components/ui/DateBar';
import DataListElement from 'app/components/ui/ListElement/DataListElement';
import StepNavigator from 'app/components/app/StepNavigator';
import dictionaryGenerator from 'app/utils/dictionaryGenerator';

const PrevisionEnvases = ({ history }) => {
  const [rutas] = useRutasContext();

  if (!rutas || ! rutas.data) {
    history.push('/');
    return null;
  }

  const rutaRecogidasData = Object.keys(rutas.data).reduce((result, key) => ([
    ...result,
    ...rutas.data[key].data
  ]), []);

  const containersDictionary = dictionaryGenerator(rutaRecogidasData, "res_InventPackingMaterialCode", "res_Qty_Env", "packingMaterialName");
  const containerKeys = Object.keys(containersDictionary);

  const moveBack = () => {
    history.push("/cartaporte");
  }

  return (
    <Fragment>
      <TopBar
        title="Prevision de envases:"
      />
      <List>
      {containerKeys.map((container, index) =>(
        <DataListElement
          key={index}
          icon="envase"
          title={containersDictionary[container].name}
          subtitle={container}
          quantities={[containersDictionary[container].qty]}
        />
      ))}
      </List>
      <StepNavigator
        moveToPreviousText="Carta de Porte"
        moveToPreviousAction={moveBack}
        moveToNextText=""
      />
    </Fragment>
  );
};

export default withRouter(PrevisionEnvases);
