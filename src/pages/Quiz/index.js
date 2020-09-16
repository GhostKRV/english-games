import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Grid, Divider } from '@material-ui/core/';

import { Link } from 'react-router-dom';

import classnames from 'classnames';

import LinkButton from '../../components/LinkButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchQuestions } from '../../actions/quiz';

const mapStateToProps = (props) => ({
  questions: props.quiz.questions,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchQuestions: fetchQuestions,
    },
    dispatch,
  );

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    magin: '0',
  },
  quizGames: {
    margin: '0 auto',
    maxWidth: '950px',
  },
  paper: {
    marginBottom: '10px',
    padding: '10px',
  },
  questionButton: {
    width: '100%',
    justifyContent: 'left',
  },
}));

const Quiz = (props) => {
  const classes = useStyles();

  const { questions = [] } = props;

  useEffect(() => {
    props.fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const ref = React.createRef();
  return (
    <div className={classnames(classes.root, classes.quizGames)}>
      <Paper elevation={2} className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Quiz List
          <Divider />
        </Typography>

        <Grid container spacing={1}>
          {questions.map((quiz, index) => (
            <Grid key={index} item xs={12}>
              <Link
                to={`../quiz/${index}`}
                component={LinkButton}
                innerRef={ref}
                className={classes.questionButton}
              >
                {quiz.title}
              </Link>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
