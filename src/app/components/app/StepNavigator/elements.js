import { styled } from 'styletron-react';
import getColor from 'app/styles/palette';

export const Container = styled('section', {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  position: 'fixed',
  bottom: '0',
  background: getColor('WHITE').toHexString()
});
