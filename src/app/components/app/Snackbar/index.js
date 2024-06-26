import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import UISnackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbarContext } from 'app/contexts/Snackbar';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const ContentWrapper = ({ message, onClose, variant, action=[], ...other }) => {
  const classes = useStyles();
  const Icon = variantIcon[variant];
  return (
    <SnackbarContent
      {...other}
      className={variant}
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={[classes.icon, classes.iconVariant].join(' ')} />
          {message}
        </span>
      }
      action={[
        ...action,
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
    />
  );
};

const Snackbar = () => {
  const [{ open, message, variant, action, forever=false }, setSnakbarState] = useSnackbarContext();

  const handleClose = (event, reason) => {
    if (reason !== 'clickaway') {
      setSnakbarState({ message: null, open: false });
    }
  }

  if (!open) return null;

  return (
    <UISnackbar
      open={open}
      autoHideDuration={forever ? null : 6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <ContentWrapper
        onClose={handleClose}
        variant={variant}
        message={message}
        action={action}
      />
    </UISnackbar>
  );
};

export default Snackbar;
