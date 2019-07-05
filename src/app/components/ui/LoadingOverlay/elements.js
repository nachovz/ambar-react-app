import { styled } from 'styletron-react';
import getColor from 'app/styles/palette';
import { ZINDEX } from 'app/styles/constants';

export const Overlay = styled('div', {
  minHeight: '100vh',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  background: `${getColor('BLACK').setAlpha(.8)}`,
  zIndex: ZINDEX.OVERLAY
});

export const SpinnerWrapepr = styled('div', {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
