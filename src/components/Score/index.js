import React from 'react';

import {
  Typography,
  Paper,
  Divider,
  Button,
  Box,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  circularProgress: {
    margin: '10px auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    maxWidth: '930px',
    padding: '10px',
    margin: '0 auto',
  },
  quizNavigation: {
    width: '100%',
    margin: '10px 0 0 auto',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Score = ({ testTitle, score, numberOfTests }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={2} className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          {testTitle} <Divider />
        </Typography>
        <Typography variant="h4" align="center">
          {'Your result'}
        </Typography>
        <div className={classes.circularProgress}>
          <CircularProgressWithLabel
            score={score}
            numberOfTests={numberOfTests}
          />
        </div>
        <Box className={classes.quizNavigation} spacing={1}>
          <Button size="large" color="primary" variant="contained">
            <NavLink to={`../quiz/`} className="testNumberLink">
              Go to quiz
            </NavLink>
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default Score;

function CircularProgressWithLabel({ score, numberOfTests }) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        size="140px"
        thickness={5}
        variant="static"
        value={(score / numberOfTests) * 100}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography variant="h5" component="div" color="primary">
          {`${Math.round((score / numberOfTests) * 100)}%`}
          <Divider />
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {score}/{numberOfTests}
        </Typography>
      </Box>
    </Box>
  );
}
