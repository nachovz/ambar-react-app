import React from 'react';
import getColor from 'app/styles/palette';
import Box from '@material-ui/core/Box';

const darkSpaced = {
  background: `${getColor('LIGHTGREY')}`
}

export const DarkContainer = (props) => (
  <Box style={darkSpaced} {...props}/>
);
