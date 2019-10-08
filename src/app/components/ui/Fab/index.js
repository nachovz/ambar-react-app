import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UIFab from '@material-ui/core/Fab';
import { NAVBAR_HEIGHT } from 'app/styles/constants';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: `calc(${NAVBAR_HEIGHT} + ${theme.spacing(6)}px)`,
    right: theme.spacing(2),
  }
}));

const Fab = ({ block, ...props }) => {
  const classes = useStyles();
  return (
    <UIFab className={!block ? classes.fab : ""} {...props} />
  );
}

export default Fab;