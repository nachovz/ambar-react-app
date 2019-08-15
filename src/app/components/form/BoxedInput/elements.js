import React from 'react';
import getColor from 'app/styles/palette';
import theme from 'app/styles/material';
import { withStyles } from '@material-ui/core/styles';
import { styled } from 'styletron-react';
import Box from '@material-ui/core/Box';

const styles = {
  borderedBoxMaterialStyles: {
    border: `1px solid ${getColor('PRIMARY')}`,
    padding: `${theme.spacing(2)}px`,
    textAlign: 'center',
    margin: `${theme.spacing(1)}px`
  }
};

export const BorderedContainer = withStyles(styles)(
  ({ classes, ...props }) => (
    <Box className={classes.borderedBoxMaterialStyles} {...props} />
  )
);

export const CenteredDiv = styled('div', {
  textAlign: 'center',
  paddingTop: `${theme.spacing(1)}px`
});
