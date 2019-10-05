import React from 'react';
import { styled } from 'styletron-react';
import UIButton from '@material-ui/core/Button';

const ButtonWrapper = styled('div', {
  margin: '20px 0'
});

const Button = (props) => (
  <ButtonWrapper>
    <UIButton {...props} />
  </ButtonWrapper>
);

export default Button;
