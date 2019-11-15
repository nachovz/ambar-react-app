import { styled } from 'styletron-react';
import getColor from 'app/styles/palette';

export const ErrorContainer = styled('div', {
  width: '100%',
  textAlign: 'right',
  color: `${getColor('RED')}`,
});

export const FullWidthForm = styled('form', {
  width: '100%'
})
