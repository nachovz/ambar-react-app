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
      <Typography variant="caption" display="block">
        Nombre y apellido
      </Typography>
      <Typography variant="caption" display="block">
        DNI 0000023493
      </Typography>
      </TextBox>
    </Container>
  );
};

export default MenuHeader;
