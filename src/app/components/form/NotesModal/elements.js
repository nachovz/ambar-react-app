import { withStyle } from 'styletron-react';
import PaddedContainer from 'app/components/ui/PaddedContainer';

export const CenteredPaddedContainer = withStyle(PaddedContainer, {
  width: 400,
  margin: '70px auto',
});
