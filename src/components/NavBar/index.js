import React from 'react';
import { Button, ButtonGroup, CircularProgress } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchDataInitNavbar } from '../../actions/home';

const mapStateToProps = (props) => ({
  home: props.home.home,
  common: props.common,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchDataInitNavbar: fetchDataInitNavbar,
    },
    dispatch,
  );

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
  const {
    home = [],
    common: { initNavbar = false, navbarError = null },
  } = props;
  const classes = useStyles();
  if (initNavbar) {
    props.fetchDataInitNavbar();
  }
  if (home.length === 0) {
    return (
      <div align="center">
        <CircularProgress color="inherit" size={20} />
      </div>
    );
  } else if (navbarError) {
    return (
      <div align="center">
        <p>{navbarError}</p>
      </div>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
