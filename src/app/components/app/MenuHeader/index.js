import React from 'react';
import Typography from 'app/components/ui/Typography';
import { Container, Picture, TextBox } from './elements';

const MenuHeader = () => {
  return (
    <Container>
      <Picture />
      <TextBox>
      <Typography variant="body2">
        Ambar Plus
      </Typography>
      </TextBox>
    </Container>
  );
};

export default MenuHeader;
