import React from 'react';
import { useLoadingContext } from 'app/contexts/Loading';
import LoadingOverlay from 'app/components/ui/LoadingOverlay';

const LoadingIndicator = () => {
  const [isLoading] = useLoadingContext();

  if (!isLoading) return null;

  return (
      <LoadingOverlay />
  );
};

export default LoadingIndicator;
