import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import quizData from '../../data/quiz.json';

import './index.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      justifyContent: 'start',
    },
  },
}));

function Quiz() {
  const classes = useStyles();

  return (
    <div className={classes.root + ' quizGame'}>
      <Typography variant="h3">Quiz List</Typography>
      {quizData.map((quiz, index) => (
        <Button variant="outlined" size="large" href={`../quiz/${index}`}>
          {quiz.title}
        </Button>
      ))}
    </div>
  );
}

export default Quiz;
