import React from 'react';
import LoadingSpinner from 'app/components/ui/LoadingSpinner';
import { Overlay, SpinnerWrapepr } from './elements';

const LoadingOverlay = () => (
  <Overlay>
    <SpinnerWrapepr>
      <LoadingSpinner />
    </SpinnerWrapepr>
  </Overlay>
);

export default LoadingOverlay;
