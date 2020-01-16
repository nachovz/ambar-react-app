import { styled } from 'styletron-react';
import theme from 'app/styles/material';

export default styled('div', ({
  $backgroundColor = 'inherit',
  $noHorizontal = false,
  $noVertical = false,
  $simpleCentered = false
}) => {
  return {
    display: 'flex',
    fontSize: '20px',
    flexWrap: 'wrap',
    alignItems: 'center',
    background: $backgroundColor,
    color: ($backgroundColor === 'black' && 'white') || 'inherit',
    padding:
      `${$noVertical ? '0' : theme.spacing(2)+'px'} ${$noHorizontal ? '0' : theme.spacing(2)+'px'}`,
    justifyContent: !$simpleCentered ? 'space-between' : 'center'
  };
});