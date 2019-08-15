import { styled } from 'styletron-react';
import getColor from 'app/styles/palette';

export const Container = styled('section', {
  display: 'flex',
  padding: '20px',
  color: getColor('WHITE').toHexString(),
  background: getColor('PRIMARY').toHexString()
});

export const Picture = styled('div', {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: getColor('LIGHTGREY').toHexString()
});

export const TextBox = styled('div', {
  marginLeft: '20px'
});
