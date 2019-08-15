import React from 'react';
import { storiesOf } from '@storybook/react';
import List from 'app/components/ui/List';
import TopBar from '../';

storiesOf('TopBar', module)
  .add('Simple', () => (

    <List>
      <TopBar
        title="Carta de porte Nº 198044_amb"
      />
    </List>

  ))
  .add('With rightText', () => (
    <List>
      <TopBar
        title="Total avisos: 8"
        rightText="5 Feb 2019"
      />
    </List>
  ))
  .add('Interactive', () => (
    <List>
      <TopBar
        title="Carta de porte Nº 198044_amb"
        actionIcon="camara"
        action={() => console.log("Action Clicked!")}
      />
    </List>
  ))
  .add('Interactive (2 actions)', () => (
    <List>
      <TopBar
        title="Carta de porte Nº 198044_amb"
        actionIcon="camara"
        action={() => console.log("Action Clicked!")}
        secondaryActionIcon="borrar"
        secondaryAction={() => console.log("Action2 Clicked!")}
      />
    </List>
  ));