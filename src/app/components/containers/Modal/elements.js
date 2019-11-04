import { styled } from 'styletron-react';
import getColor from 'app/styles/palette';
import { ZINDEX } from 'app/styles/constants';

export const CloseContainer = styled('div', {
  position: 'fixed',
  zIndex: ZINDEX.MODAL,
  right: 0,
  margin: "15px",
  color: getColor('WHITE').toHexString()
});
