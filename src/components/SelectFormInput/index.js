import React from 'react';

import { Paper, TextField, MenuItem } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const requestMethods = [
  {
    value: 'GET',
    label: 'GET',
  },
  {
    value: 'POST',
    label: 'POST',
  },
  {
    value: 'PUT',
    label: 'PUT',
  },
  {
    value: 'DELETE',
    label: 'DELETE',
  },
  {
    value: 'PATCH',
    label: 'PATCH',
  },
];

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

const SelectFormInput = (props) => {
  const classes = useStyles();
  const {
    value = null,
    onChange,
    label = null,
    helperText = null,
    options = requestMethods,
  } = props;

  return (
    <Paper className={classes.paper}>
      <TextField
        select
        label={label}
        value={value}
        onChange={onChange}
        helperText={helperText}
        className={classes.parametersField}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Paper>
  );
};

export default SelectFormInput;
