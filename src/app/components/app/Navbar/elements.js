import { styled } from 'styletron-react';
import { NAVBAR_HEIGHT } from 'app/styles/constants';
import getColor from 'app/styles/palette';

export const Nav = styled('nav', {
  height: NAVBAR_HEIGHT,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20px',
  color: getColor('WHITE').toHexString(),
  background: getColor('PRIMARY').toHexString(),
  position: 'fixed',
  width: '100%',
  zIndex: '1000'
});

export const Title = styled('div', {
  flexGrow: 2,
  textAlign: 'center'
});

export const MenuAction = styled('span', {
  cursor: 'pointer'
});
