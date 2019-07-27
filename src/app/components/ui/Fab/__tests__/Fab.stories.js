import React from 'react';
import { storiesOf } from '@storybook/react';

import Fab from '../';
import { styled } from 'styletron-react';
import Icon from 'app/components/ui/Icon';
import ICONS from 'app/constants/icons';
import PaddedContainer from 'app/components/ui/PaddedContainer';

const IconHolder = styled('div', {
  margin: '20px',
  width: '150px',
  flexDirection: 'column',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

storiesOf('FAB', module)
  .add('Primary', () => (
    <Fab color="primary" aria-label="Add">
      <Icon/>
    </Fab>
  ))
  .add('Secondary', () => (
    <Fab color="secondary" aria-label="Add">
      <Icon/>
    </Fab>
  ))
  .add('Icons', () => (
    <PaddedContainer >
      {
        ICONS.map((icon, index) => (
        <IconHolder key={index}>
          <Fab color={'primary'}>
            <Icon icon={icon} fab />
          </Fab>
          <span> { icon || "default" } </span>
        </IconHolder>
        ))
      }
    </PaddedContainer>
  ));


