import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import theme from 'app/styles/material';
import Paper from 'app/components/ui/Paper';
import getColor from 'app/styles/palette';

const styles = {
  root: {
    border: `1px ${getColor('LIGHTGREY')} solid`,
    width: '100%',
    textAlign: 'center',
    padding: `${theme.spacing(2)}px 0`
  }
}

const BorderedContainer = ({ classes, ...props }) => (
  <Paper {...props} className={classes.root}>
  </Paper>
);

export default withStyles(styles)(BorderedContainer);