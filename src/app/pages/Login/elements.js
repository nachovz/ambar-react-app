import { styled } from 'styletron-react';

export const Main = styled('main', {
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '80px 40px'
});

export const Logo = styled('img', {
  width: '150px',
  height: 'auto',
  marginBottom: '80px'
});

export const FormWrapper = styled('div', {
  width: '100%'
});

export const Footer = styled('section', {
  position: 'absolute',
  bottom: '40px'
});
