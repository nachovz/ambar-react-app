import { styled } from 'styletron-react';

export default styled('div', ({ $backgroundColor = 'inherit' }) => {
  return {
    display: 'flex',
    fontSize: '20px',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: $backgroundColor,
    color: ($backgroundColor === 'black' && 'white') || 'inherit'
  };
});