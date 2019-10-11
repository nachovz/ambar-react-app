import React from 'react';
import { storiesOf } from '@storybook/react';
import DataListElement from '../';
import List from 'app/components/ui/List';

storiesOf('List Elements', module)
  .add('DataListElement', () => (
    <List>
      <DataListElement
        button
        icon="envase"
        title="Contenedor Baterías"
        quantities={[18]}
      />
      <DataListElement
        icon="mantenimiento"
        title="RP_Baterías de plomo"
        subtitle="2324441"
        quantities={[5, -20]}
      />
      <DataListElement
        title="Residuos Recogidos"
        quantities={ ["Ud.", "Kg."] }
        actionIcon="estado-aviso"
      />
      <DataListElement
        title="RP_Baterías de plomo"
        subtitle="2324441"
        quantities={[5, -20]}
        actionIcon="editar"
      />
      <DataListElement
        title="RP_Baterías de plomo con nombre largo"
        subtitle="2324441"
        quantities={[5000, -20000]}
        actionIcon="editar"
      />
      <DataListElement
        title="RP_Baterías de plomo con otro nombre largo"
        subtitle="2324441"
        quantities={[5, -20]}
        actionIcon="editar"
      />
    </List>
  ));