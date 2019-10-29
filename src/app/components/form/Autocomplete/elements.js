import { styled } from 'styletron-react';
import getColor from 'app/styles/palette';

export const FieldWrapper = styled('div', {
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  flexWrap: 'wrap',
  minWidth: '20px'
});

export const Error = styled('div', {
  alignSelf: 'flex-end',
  marginTop: '4px',
  fontSize: '0.7em',
  color: `${getColor('RED')}`
})