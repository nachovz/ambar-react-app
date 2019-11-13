import React from 'react';
import theme from 'app/styles/material';
import { withStyles } from '@material-ui/core/styles';
import { styled } from 'styletron-react';
import Row from 'app/components/ui/Row';

const styles = {
  customRow: {
    justifyContent: 'space-around',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  borderedBoxMaterialStyles: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    width: '50%'
  },
  innerRow:{
    flexGrow: '1',
    width: '50%'
  }
};

export const CustomRow = withStyles(styles)(
  ({ classes, ...props }) =>(
    <Row customClass={classes.customRow} {...props} />
  )
);

export const CenteredDiv = styled('div', {
  textAlign: 'center'
});

export const InnerRow = withStyles(styles)(
  ({ classes, ...props}) => (
    <Row customClass={classes.innerRow} {...props} />
  )
);