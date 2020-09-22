import React, { useEffect } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchFirebaseData } from '../../actions/firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: '1000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const NavBar = (props) => {
  const { home = [] } = props;
  const classes = useStyles();

  useEffect(() => {
    props.fetchFirebaseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <ButtonGroup
        size="large"
        color="primary"
        aria-label="small outlined button group"
      >
        {home.map((game, index) => (
          <Button size="large" key={index} href={game.route}>
            {game.title}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

const mapStateToProps = (props) => ({
  home: props.home.data,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchFirebaseData: fetchFirebaseData,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
