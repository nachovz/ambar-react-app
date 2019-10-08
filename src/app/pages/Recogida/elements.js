import { styled } from 'styletron-react';
import getColor from 'app/styles/palette';

export const CloseContainer = styled('div', {
  position: 'fixed',
  zIndex: 100,
  right: 0,
  margin: "15px",
  color: getColor('WHITE').toHexString()
});
