import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchHomeConfiguration } from '../../actions/home';

const mapStateToProps = (props) => ({
  home: props.home.home,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchHomeConfiguration: fetchHomeConfiguration,
    },
    dispatch,
  );

const useStyles = makeStyles((theme) => ({
  root: {
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
    props.fetchHomeConfiguration();
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
