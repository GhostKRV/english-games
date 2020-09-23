import React from 'react';

import { Button, ButtonGroup } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

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

export default connect(mapStateToProps)(NavBar);
