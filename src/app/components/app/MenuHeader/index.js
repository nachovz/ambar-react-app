import React from 'react';
import Typography from 'app/components/ui/Typography';
import { Container, Picture, TextBox } from './elements';
import { getName } from 'app/constants/values';

const MenuHeader = () => {
  return (
    <Container>
      <Picture />
      <TextBox>
      <Typography variant="body2">
        {getName()}
      </Typography>
      </TextBox>
    </Container>
  );
};

export default MenuHeader;
