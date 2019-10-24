import React from 'react';
import getColor from 'app/styles/palette';
import theme from 'app/styles/material';
import { withStyles } from '@material-ui/core/styles';
import { styled } from 'styletron-react';
import Box from '@material-ui/core/Box';
import Row from 'app/components/ui/Row';

const styles = {
  specialRow: {
    justifyContent: 'space-around'
  },
  borderedBoxMaterialStyles: {
    border: `1px solid ${getColor('PRIMARY')}`,
    padding: `${theme.spacing(2)}px`,
    textAlign: 'center',
    margin: `${theme.spacing(1)}px`,
    width: '200px'
  }
};

export const CustomRow = withStyles(styles)(
  ({ classes, ...props }) =>(
    <Row customClass={classes.specialRow} {...props} />
  )
);

export const BorderedContainer = withStyles(styles)(
  ({ classes, ...props }) => (
    <Box className={classes.borderedBoxMaterialStyles} {...props} />
  )
);

export const CenteredDiv = styled('div', {
  textAlign: 'center'
});
