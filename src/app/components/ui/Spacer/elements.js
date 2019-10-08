import { styled } from 'styletron-react';
import theme from 'app/styles/material';

// Contants
const SIZES = {
  xs: `${theme.spacing(0.5)}px`,
  sm: `${theme.spacing(1)}px`,
  md: `${theme.spacing(2)}px`,
  lg: `${theme.spacing(3)}px`,
  xl: `${theme.spacing(7)}px`
};

export const Container = styled('div', ({ $direction, $size }) => {
  const isHorizontal = $direction === 'horizontal';
  return {
    width: isHorizontal ? SIZES[$size] : '100%',
    height: isHorizontal ? '100%' : SIZES[$size]
  };
});
