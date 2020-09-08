import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Paper, Grid, Divider } from '@material-ui/core/';

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

import classnames from 'classnames';

import quizData from '../../data/quiz.json';

import './index.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    magin: '0',
  },
  questionButton: {
    width: '100%',
    justifyContent: 'left',
    padding: '0',
  },
  paper: {
    marginBottom: '10px',
    padding: '10px',
  },
}));

const Quiz = (props) => {
  const classes = useStyles();
  return (
    <div className={classnames(classes.root, 'quizGames')}>
      <Paper elevation={2} className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Quiz List
          <Divider />
        </Typography>

        <Grid container spacing={1}>
          {quizData.map((quiz, index) => (
            <Grid key={index} item xs={12}>
              <Button
                className={classes.questionButton}
                variant="outlined"
                size="large"
              >
                <NavLink to={`../quiz/${index}`} className="testNumberLink">
                  {quiz.title}
                </NavLink>{' '}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
};

export default Quiz;
