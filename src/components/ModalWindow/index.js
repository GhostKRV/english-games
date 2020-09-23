import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, IconButton, Typography } from '@material-ui/core';
import {
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  root: {
    display: 'block',
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ModalWindow({ isActive, questionText, onClose }) {
  return (
    <div>
      <Dialog
        fullWidth={true}
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={isActive}
      >
        <DialogTitle id="customized-dialog-title" onClose={onClose}>
          Question
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{questionText}</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
