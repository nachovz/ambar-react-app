import React from 'react';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const styles = {
  root:{
    display: 'flex',
    flexDirection: 'row'
  },
  centered:{
    justifyContent: 'center'
  }
}

const Row = ({
  classes,
  centered,
  ...props
}) => (
  <Box
    {...props}
    className={clsx(classes.root, centered && classes.centered)}
/>
);

export default withStyles(styles)(Row);