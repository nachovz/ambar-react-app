import { styled, withStyle } from 'styletron-react';
import Paper from 'app/components/ui/Paper';
import PaddedContainer from 'app/components/ui/PaddedContainer';
import Button from 'app/components/ui/Button';

import theme from 'app/styles/material';
import getColor from 'app/styles/palette';

export const CenteredPaddedContainer = withStyle(PaddedContainer, {
  margin: '0 auto'
});

export const BorderedContainer = styled(Paper, {
  border: `1px ${getColor('LIGHTGREY')} solid`,
  width: '100%',
  textAlign: 'center',
  padding: `${theme.spacing(2)}px 0`
});

export const ImageComponent = styled('img', {
  maxHeight: '250px',
  maxWidth: '100%'
});

export const ErrorContainer = styled('div', {
  width: '100%',
  textAlign: 'right',
  color: `${getColor('RED')}`,
});

export const ButtonsContainer = withStyle(PaddedContainer, {
  display: 'flex',
  justifyContent: 'flex-end'
});

export const FullWidthButton = styled(Button, {
  width: '100%',
});
