import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Grid, Divider } from '@material-ui/core';

import { Link } from 'react-router-dom';

import classnames from 'classnames';

import LinkButton from '../../components/LinkButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchFirebaseData } from '../../actions/firebase';

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
  const { quiz = [] } = props;

  const ref = React.createRef();

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

const mapStateToProps = (props) => ({
  quiz: props.quiz.data,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchFirebaseData: fetchFirebaseData,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
