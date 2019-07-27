import React from 'react';
import getColor from 'app/styles/palette';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  darkCenteredMaterialStyles : {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    background: `${getColor('LIGHTGREY')}`
  },
  centered : {
    textAlign: 'center'
  }
};

export const DarkContainer = withStyles(styles)(
  ( { classes, ...props } ) => (
    <Box className={classes.darkCenteredMaterialStyles} {...props}/>
  )
);

export const Centered = withStyles(styles)(
  ( { classes, ...props } ) => (
    <Box className={classes.centered} mx={2} {...props} />
  )
);