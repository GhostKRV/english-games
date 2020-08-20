import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

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
  },
  paper: {
    marginBottom: '10px',
    padding: '10px',
  },
}));

function Quiz() {
  const classes = useStyles();

  return (
    <div className={classes.root + ' quizGame'}>
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
                href={`../quiz/${index}`}
                onClick={() => {}}
              >
                {quiz.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
}

export default Quiz;
