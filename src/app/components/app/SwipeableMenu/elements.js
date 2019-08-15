import { styled } from 'styletron-react';
import getColor from 'app/palette';

export const BottomSection = styled('div', {
  padding: '16px',
  marginTop: '20px',
  borderTop: `1px solid ${getColor('GREY')}`
});

export const SelectWrapper = styled('div', {
  display: 'flex',
  alignItems: 'flex-end'
});

export const IconWrapper = styled('div', {
  marginRight: '15px'
});

export const PhoneWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px'
});

export const PhoneItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Roboto'
});
