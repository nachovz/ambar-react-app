import { styled, withStyle } from 'styletron-react';
import PaddedContainer from 'app/components/ui/PaddedContainer';
import Button from 'app/components/ui/Button';
import getColor from 'app/styles/palette';

export const CenteredPaddedContainer = withStyle(PaddedContainer, {
  margin: '0 auto'
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
