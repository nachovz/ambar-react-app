import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const styles = {
  root:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'left'
  },
  centered:{
    justifyContent: 'center'
  },
  spaceBetween:{
    justifyContent: 'space-between'
  }
}

const Row = ({
  classes,
  centered,
  spaceBetween,
  customClass,
  ...props
}) => (
  <Box
    {...props}
    className={clsx(
      classes.root,
      centered && classes.centered,
      spaceBetween && classes.spaceBetween,
      customClass && customClass
    )}
/>
);

export default withStyles(styles)(Row);