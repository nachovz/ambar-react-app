import { styled } from 'styletron-react';
import getColor from 'app/styles/palette';
import theme from 'app/styles/material';

export const PrimaryCenteredText = styled('div', {
  color: `${getColor('PRIMARY')}`,
  textAlign: 'center',
  width: '100%',
  padding: `${theme.spacing(2)}px`
});
