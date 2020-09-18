import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Paper,
  Grid,
  Divider,
  CircularProgress,
} from '@material-ui/core/';

import { Link } from 'react-router-dom';

import classnames from 'classnames';

import LinkButton from '../../components/LinkButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchQuestions } from '../../actions/quiz';

const mapStateToProps = (props) => ({
  quiz: props.quiz.quiz,
  common: props.common,
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
  const {
    quiz = [],
    common: { init = false, error = null },
  } = props;

  if (init) {
    props.fetchQuestions();
  }

  const ref = React.createRef();
  if (quiz.length === 0) {
    return (
      <div align="center">
        <CircularProgress color="inherit" size={20} />
      </div>
    );
  } else if (error) {
    return (
      <div align="center">
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div className={classnames(classes.root, classes.quizGames)}>
      <Paper elevation={2} className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Quiz List
          <Divider />
        </Typography>

        <Grid container spacing={1}>
          {quiz.map((quiz, index) => (
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
