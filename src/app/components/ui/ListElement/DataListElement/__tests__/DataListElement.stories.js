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
        noIcon
        icon="mantenimiento"
        title="16060100"
        subtitle="RP_Baterías de plomo"
        quantities={[5, -20]}
      />
      <DataListElement
        noIcon
        icon="mantenimiento"
        title="16060100"
        subtitle="RP_Baterías de plomo"
        quantities={[5, -20]}
        actionIcon="editar"
      />
    </List>
  ));