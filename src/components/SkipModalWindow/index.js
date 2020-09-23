import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const SkipModalWindow = (props) => {
  const { active = false, onClose, fetchTestAnswers } = props;

  return (
    <Dialog
      open={active}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Skip question</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This question will be skipped. We will mark this question as
          incorrect. Do you agree?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onClose();
            fetchTestAnswers();
          }}
          color="primary"
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SkipModalWindow;
