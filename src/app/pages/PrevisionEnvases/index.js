import React, { Fragment } from 'react';
import TopBar from 'app/components/ui/TopBar';
import Typography from 'app/components/ui/Typography';
import List from 'app/components/ui/List';
import DataListElement from 'app/components/ui/ListElement/DataListElement';
import { Date } from './elements';

const PrevisionEnvases = () => {
  return (
    <Fragment>
      <TopBar title="PREVISIÓN DE ENVASES - RUTA" />
      <Date>
        <Typography variant="caption">
          FECHA RECOGIDA: 5 Febrero 2019
        </Typography>
      </Date>
      <List>
        <DataListElement
          icon="envase"
          title="Contenedor Baterías"
          quantities={[1]}
        />
        <DataListElement
          icon="envase"
          title="Bagst 200"
          quantities={[18]}
        />
        <DataListElement
          icon="envase"
          title="Bidon 60"
          quantities={[4]}
        />
        <DataListElement
          icon="envase"
          title="Bidon B200 B"
          quantities={[1]}
        />
        <DataListElement
          icon="envase"
          title="Bidon 5"
          quantities={[1]}
        />
        <DataListElement
          icon="envase"
          title="A granel"
          quantities={[8]}
        />
      </List>
    </Fragment>
  );
};

export default PrevisionEnvases;
