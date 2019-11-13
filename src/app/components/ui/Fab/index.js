import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UIFab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: `11px`,
    left: `calc(calc(100vw / 2) - calc(56px / 2))`,
    zIndex: 100
  }
}));

const Fab = ({ block, ...props }) => {
  const classes = useStyles();
  return (
    <UIFab className={!block ? classes.fab : ""} {...props} />
  );
}

export default Fab;