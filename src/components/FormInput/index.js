import React from 'react';

import { Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: '1360px',
    padding: '10px',
    margin: '0 auto',
    boxShadow: 'none',
  },
  parametersField: {
    width: '100%',
  },
  sendButton: {
    width: '100%',
    marginTop: '12px',
  },
}));

const FormInput = (props) => {
  const classes = useStyles();
  const {
    value = null,
    onChange,
    label = null,
    helperText = null,
  } = props;

  return (
    <Paper className={classes.paper}>
      <TextField
        label={label}
        multiline
        value={value}
        onChange={onChange}
        helperText={helperText}
        className={classes.parametersField}
        {...props}
      />
    </Paper>
  );
};

export default FormInput;
