import React from 'react';
import { storiesOf } from '@storybook/react';
import TopBar from '../';

storiesOf('TopBar', module)
  .add('Simple', () => (
    <TopBar
      title="Carta de porte Nº 198044_amb"
    />

  ))
  .add( 'Interactive', () => (
    <TopBar
      title="Carta de porte Nº 198044_amb"
      actionIcon="camara"
      action={() => console.log("Action Clicked!")}
    />
  ))
  .add( 'Interactive (2 actions)', () => (
    <TopBar
      title="Carta de porte Nº 198044_amb"
      actionIcon="camara"
      action={() => console.log("Action Clicked!")}
      actionIcon2="borrar"
      action2={() => console.log("Action2 Clicked!")}
    />
  ));