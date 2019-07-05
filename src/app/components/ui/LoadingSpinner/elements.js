import { styled, withStyle } from 'styletron-react';
import getColor from 'app/styles/palette';

export const Ring = styled('div', {
  display: 'inline-block',
  position: 'relative',
  width: '64px',
  height: '64px'
});

export const Segment = styled('div', ({ $color }) => ({
  boxSizing: 'border-box',
  display: 'block',
  position: 'absolute',
  width: '51px',
  height: '51px',
  margin: '6px',
  borderStyle: 'solid',
  borderWidth: '6px',
  borderRadius: '50%',
  borderColor: `${getColor($color)} transparent transparent transparent`,
  animationDuration: '1.2s',
  animationTimingFunction: 'cubic-bezier(0.5, 0, 0.5, 1)',
  animationIterationCount: 'infinite',
  animationName: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  }
}));

export const First = withStyle(Segment, {
  animationDelay: '-0.45s'
});

export const Second = withStyle(Segment, {
  animationDelay: '-0.3s'
});

export const Third = withStyle(Segment, {
  animationDelay: '-0.15s'
});
