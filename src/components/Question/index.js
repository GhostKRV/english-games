import React from 'react';

import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSelectedAnswer } from '../../actions/quiz.js';

const useStyles = makeStyles((theme) => ({
  answer: {
    width: '100%',
    height: '100%',
  },
}));

const mapStateToProps = (props) => ({
  selectedAnswer: props.quiz.selectedAnswer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchSelectedAnswer: fetchSelectedAnswer,
    },
    dispatch,
  );

const Question = (props) => {
  const { selectedAnswer = {}, selectedQuestion = {} } = props;

  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      {selectedQuestion.answers.map((question, index) => (
        <Grid key={index} item xs={12} sm={6}>
          <Button
            className={classes.answer}
            color={
              index === selectedAnswer.selectedAnswer
                ? 'primary'
                : index === selectedAnswer.correctAnswer
                ? 'secondary'
                : 'default'
            }
            variant="outlined"
            size="large"
            onClick={() => {
              if (selectedAnswer.correctAnswer === null) {
                props.fetchSelectedAnswer({ ...selectedAnswer, selectedAnswer: index });
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

export default connect(mapStateToProps, mapDispatchToProps)(Question);
