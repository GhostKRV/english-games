import React from 'react';

import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  answer: {
    width: '100%',
    height: '100%',
  },
}));

const Question = (props) => {
  const {
    selectedAnswer = {},
    selectedQuestion = {},
    setSelectedAnswer,
  } = props;

  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      {selectedQuestion.answers.map((question, index) => (
        <Grid key={index} item xs={12} sm={6}>
          <Button
            className={classes.answer}
            color={
              index === selectedAnswer.userAnswer
                ? 'primary'
                : index === selectedAnswer.correctAnswer
                ? 'secondary'
                : 'default'
            }
            variant="outlined"
            size="large"
            onClick={() => {
              if (selectedAnswer.correctAnswer === null) {
                setSelectedAnswer({
                  ...selectedAnswer,
                  userAnswer: index,
                });
              }
            }}
          >
            {question}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default Question;
