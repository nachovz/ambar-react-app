import React from 'react';
import Typography from 'app/components/ui/Typography';
import Fab from 'app/components/ui/Fab';
import Icon from 'app/components/ui/Icon';
import Box from '@material-ui/core/Box';


import { DarkContainer, Centered } from './elements';

const QuickLinks = ({
    mobile,
    phone,
    ...props
}) => (
  <DarkContainer pt={2}>
    <Centered>
      <Fab color="primary">
        <Icon icon="phone" fab/>
      </Fab>
      <Box my={2}>
        <Typography >
          888 999 00 44
        </Typography>
      </Box>
    </Centered>
    <Centered>
      <Fab color="primary">
        <Icon icon="movil" fab/>
      </Fab>
      <Box my={2}>
        <Typography >
          888 999 00 44
        </Typography>
      </Box>
    </Centered>
    <Centered>
      <Fab color="primary">
        <Icon icon="ver" fab/>
      </Fab>
      <Box my={2}>
        <Typography >
          Carta de porte
        </Typography>
      </Box>
    </Centered>
  </DarkContainer>
);

export default QuickLinks;