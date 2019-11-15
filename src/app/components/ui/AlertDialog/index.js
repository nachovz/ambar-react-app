import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from 'app/components/ui/Button';
import Spacer from 'app/components/ui/Spacer';

const AlertDialog = ({
  title,
  open,
  handleClose,
  content,
  handleAgree,
  agreedText,
  cancelText
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        {!!content &&
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {content}
            </DialogContentText>
          </DialogContent>
        }
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">
            {cancelText}
          </Button>
          <Spacer direction="horizontal"/>
          <Button onClick={handleAgree} variant="outlined" color="primary" autoFocus>
            {agreedText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;