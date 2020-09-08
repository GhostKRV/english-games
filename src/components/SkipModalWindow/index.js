import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core/';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTestAnswers } from '../../actions/quiz.js';

const mapStateToProps = (props) => ({
  testAnswers: props.quiz.testAnswers,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchTestAnswers: fetchTestAnswers,
    },
    dispatch,
  );

const SkipModalWindow = (props) => {
  const { active = false, onClose, testAnswers = [] } = props;

  return (
    <Dialog
      open={active}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Skip question'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This question will be skipped. We will mark this question is
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
            props.fetchTestAnswers([...testAnswers, false]);
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

export default connect(mapStateToProps, mapDispatchToProps)(SkipModalWindow);
