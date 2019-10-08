import React from 'react';
import { Container } from './elements';

// Types
/*type Props = {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  direction: 'vertical' | 'horizontal'
};*/

const Spacer = ({ direction = 'vertical', size = 'md' }) => (
  <Container $size={size} $direction={direction} />
);

export default Spacer;
