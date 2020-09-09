import React, { useEffect, useState } from 'react';

import { Typography, Paper, Divider, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Question from '../../../components/Question';

import Score from '../../../components/Score';

import {
  fetchSelectedQuestions,
  fetchTestDetails,
} from '../../../actions/quiz.js';

import SkipModalWindow from '../../../components/SkipModalWindow';

const useStyles = makeStyles((theme) => ({
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
    },
    dispatch,
  );

const QuestionWrapper = (props) => {
  const {
    match: { params: { testNumber = null } = {} } = {},
    selectedQuestion = null,
    testTitle = null,
  } = props;

  const [active, setActive] = useState(false);
  const [testAnswers, setTestAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState({
    userAnswer: null,
    correctAnswer: null,
  });

  const classes = useStyles();

  useEffect(() => {
    props.fetchTestDetails(testNumber);
    props.fetchSelectedQuestions(testAnswers.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testNumber, testAnswers]);

  if (selectedQuestion === null) {
    if (testAnswers.length) {
      return (
        <Score
          testTitle={testTitle}
          score={testAnswers.filter((answer) => answer).length}
          numberOfTests={testAnswers.length}
        />
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
        <Question
          selectedAnswer={selectedAnswer}
          selectedQuestion={selectedQuestion}
          setSelectedAnswer={setSelectedAnswer}
        />
        <Box className={classes.quizNavigation} spacing={1}>
          <SkipModalWindow
            active={active}
            onClose={() => {
              setActive(false);
            }}
            fetchTestAnswers={() => {
              setTestAnswers([...testAnswers, false]);
            }}
          />
          <Button
            size="large"
            color="secondary"
            disabled={
              selectedAnswer.userAnswer !== null &&
              selectedAnswer.correctAnswer !== null
            }
            onClick={() => {
              setActive(true);
              setSelectedAnswer({
                ...selectedAnswer,
                userAnswer: null,
                correctAnswer: null,
              });
            }}
          >
            Skip
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button
            color="primary"
            size="large"
            disabled={
              selectedAnswer.correctAnswer !== null ||
              selectedAnswer.userAnswer === null
            }
            onClick={() => {
              setSelectedAnswer({
                ...selectedAnswer,
                correctAnswer: selectedAnswer.userAnswer,
                userAnswer: selectedQuestion.correct,
              });
              setTimeout(() => {
                if (
                  selectedAnswer.userAnswer === selectedQuestion.correct
                ) {
                  setTestAnswers([...testAnswers, true]);
                } else {
                  setTestAnswers([...testAnswers, false]);
                }
                setSelectedAnswer({
                  ...selectedAnswer,
                  userAnswer: null,
                  correctAnswer: null,
                });
              }, 1500);
            }}
          >
            Check
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionWrapper);
