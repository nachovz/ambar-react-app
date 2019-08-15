import React from 'react';
import Typography from 'app/components/ui/Typography';
import Fab from 'app/components/ui/Fab';
import Icon from 'app/components/ui/Icon';
import Box from '@material-ui/core/Box';
import { DarkContainer, Centered } from './elements';

const QuickLinks = ({ mobile, phone, mainAction }) => (
  <DarkContainer pt={2}>
    <Centered>
      <Fab
        block
        color="primary"
        onClick={() => console.log(`Action: call ${phone}`)}
      >
        <Icon icon="phone" fab />
      </Fab>
      <Box my={2}>
        <Typography variant="caption">
          {phone}
        </Typography>
      </Box>
    </Centered>
    <Centered>
      <Fab
        block
        color="primary"
        onClick={() => console.log(`Action: call ${mobile}`)}
      >
        <Icon icon="movil" fab />
      </Fab>
      <Box my={2}>
        <Typography variant="caption">
          {mobile}
        </Typography>
      </Box>
    </Centered>
    <Centered>
      <Fab
        block
        color="primary"
        onClick={mainAction}
      >
        <Icon icon="ver" fab />
      </Fab>
      <Box my={2}>
        <Typography variant="caption">
          Carta de porte
        </Typography>
      </Box>
    </Centered>
  </DarkContainer>
);

export default QuickLinks;