import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import quizData from '../../data/quiz.json';

import classnames from 'classnames';

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

export default function Question(props) {
  const testNumber = (props.match.params.testNumber);
  const classes = useStyles();

  const [correctAnswers, addCorrectAnswers] = useState(0);
  const [enabled, setEnabled] = useState(true);
  const [quizNumber, setQuizNumber] = useState(0);

  const [activeAnswer, setActiveAnswer] = useState(
    Array(quizData[testNumber].questions[quizNumber].answers.length).fill(0),
  );

  function checkResult() {
    setActiveAnswer(
      activeAnswer.map((elem, ind) => {
        if (
          elem === 1 &&
          quizData[testNumber].questions[quizNumber].correct !== ind
        ) {
          return 2;
        } else if (quizData[testNumber].questions[quizNumber].correct === ind) {
          return 1;
        } else {
          return elem;
        }
      }),
    );

    if (
      activeAnswer.indexOf(1) ===
      quizData[testNumber].questions[quizNumber].correct
    ) {
      addCorrectAnswers(correctAnswers + 1);
    }

    setTimeout(() => {
      setActiveAnswer(
        Array(quizData[testNumber].questions[quizNumber].answers.length).fill(
          0,
        ),
      );
      setEnabled(true);

      if (quizData[testNumber].questions.length !== quizNumber + 1) {
        setQuizNumber(quizNumber + 1);
      } else {
        console.log(correctAnswers);
      }
    }, 300);
    if (
      activeAnswer.indexOf(1) ===
      quizData[testNumber].questions[quizNumber].correct
    ) {
      addCorrectAnswers(correctAnswers + 1);
    }
  }

  return (
    <div className={classes.root}>
      <Paper elevation={2} className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          {quizData[testNumber].title +
            '/' +
            quizData[testNumber].questions[quizNumber].title}
          <Divider />
        </Typography>
        <Typography variant="h6" gutterBottom>
          {quizData[testNumber].questions[quizNumber].description}
        </Typography>

        <Grid container spacing={1}>
          {quizData[testNumber].questions[quizNumber].answers.map(
            (ques, index) => (
              <Grid item key={index} xs={12} sm={6}>
                <Button
                  className={classnames(classes.answer, {
                    'MuiButton-outlinedPrimary': activeAnswer[index] === 1,
                    'MuiButton-outlinedSecondary': activeAnswer[index] === 2,
                  })}
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    if (enabled) {
                      setActiveAnswer(
                        activeAnswer.map((elem, ind) => {
                          if (index === ind) {
                            return 1;
                          } else {
                            return 0;
                          }
                        }),
                      );
                    }
                  }}
                >
                  {ques}
                </Button>
              </Grid>
            ),
          )}
        </Grid>

        <Box className={classes.quizNavigation} spacing={1}>
          <Button variant="contained" color="secondary">
            Skip
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setEnabled(false);
              checkResult();
            }}
          >
            Check
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
