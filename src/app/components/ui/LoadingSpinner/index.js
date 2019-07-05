import React from 'react';
import { Ring, Segment, First, Second, Third } from './elements';

const LoadingSpinner = ({ color = 'PRIMARY' }) => (
  <Ring>
    <First color={color} />
    <Second color={color} />
    <Third color={color} />
    <Segment color={color} />
  </Ring>
);

export default LoadingSpinner;
