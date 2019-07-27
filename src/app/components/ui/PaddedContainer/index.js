import { styled } from 'styletron-react';

export default styled('div', ({ backgroundColor }) => {
  return {
    display: 'flex',
    fontSize: '20px',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: backgroundColor || 'inherit',
    color: (backgroundColor === 'black' && 'white') || 'inherit'
  };
});