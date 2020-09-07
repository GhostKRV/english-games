import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  fetchQuestionAnswers,
  fetchSelectedQuestions,
  fetchTestDetails,
} from '../../actions/quiz.js';

const useStyles = makeStyles((theme) => ({
  root: {},
  answer: {
    width: '100%',
    height: '100%',
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
    justifyContent: 'flex-end',
  },
}));

const mapStateToProps = (props) => ({
  testTitle: props.quiz.selectedTest.title,
  selectedQuestion: props.quiz.selectedQuestion,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchTestDetails: fetchTestDetails,
      fetchSelectedQuestions: fetchSelectedQuestions,
      fetchQuestionAnswers: fetchQuestionAnswers,
    },
    dispatch,
  );

const Question = (props) => {
  const {
    match: { params: { testNumber = null } = {} } = {},
    selectedQuestion = null,
    testTitle = null,
  } = props;

  const classes = useStyles();

  const [selectedAnswer, setSelectedAnswer] = useState({
    selectedAnswer: null,
    correctAnswer: null,
  });
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    props.fetchTestDetails(testNumber);
    props.fetchSelectedQuestions(answers.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testNumber, answers]);

  console.log(selectedAnswer);

  if (selectedQuestion === null) {
    if (answers.length) {
      return (
        <h1>
          {answers.filter((answer) => answer).length}/{answers.length}
        </h1>
      );
    }

    return null;
  }

  return (
    <div className={classes.root}>
      <Paper elevation={2} className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          {testTitle}
          <Divider />
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`${selectedQuestion.title}/${selectedQuestion.description}`}
        </Typography>

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
                    setSelectedAnswer({
                      ...selectedAnswer,
                      selectedAnswer: index,
                    });
                  }
                }}
              >
                {question}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Box className={classes.quizNavigation} spacing={1}>
          <Button
            size="large"
            color="secondary"
            onClick={() => {
              setAnswers([...answers, false]);
              setSelectedAnswer(null);
            }}
          >
            Skip
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button
            color="primary"
            size="large"
            disabled={selectedAnswer.selectedAnswer === null}
            onClick={() => {
              setSelectedAnswer({
                ...selectedAnswer,
                correctAnswer: selectedQuestion.correct,
              });
              setTimeout(() => {
                if (selectedAnswer === selectedQuestion.correct) {
                  setAnswers([...answers, true]);
                  setSelectedAnswer({
                    selectedAnswer: null,
                    correctAnswer: null,
                  });
                } else {
                  setAnswers([...answers, false]);
                  setSelectedAnswer({
                    selectedAnswer: null,
                    correctAnswer: null,
                  });
                }
              }, 2000);
            }}
          >
            Check
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
