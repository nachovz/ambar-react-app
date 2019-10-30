import { styled } from 'styletron-react';
import getColor from 'app/styles/palette';
import { STEPNAV_HEIGHT } from 'app/styles/constants';

export const Container = styled('section', {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  height: STEPNAV_HEIGHT,
  position: 'fixed',
  bottom: '0',
  background: getColor('LIGHTGREY').toHexString()
});
