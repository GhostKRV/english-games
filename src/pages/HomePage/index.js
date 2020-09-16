import React, { useEffect } from 'react';

import {
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
} from '@material-ui/core/';

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
  home_content: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: '95vw',
    maxWidth: '1500px',
    margin: '0 auto',
  },
  gamesGrid: {
    width: '100%',
  },
  menuGamesBackground: {
    width: '100%',
  },
  headerTitle: {
    fontSize: '36px',
  },
}));

const HomePage = (props) => {
  const { home = [] } = props;

  const classes = useStyles();

  useEffect(() => {
    props.fetchHomeConfiguration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.home_content}>
      <GridList cellHeight={180} className={classes.gamesGrid}>
        <GridListTile cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">
            <h1 className={classes.headerTitle}>ENGLISH GAMES</h1>
          </ListSubheader>
        </GridListTile>
        {home.map((game, index) => (
          <GridListTile key={index}>
            <a href={game.route}>
              <img
                className={classes.menuGamesBackground}
                src={game.image_URL}
                alt={game.title}
              />
            </a>
            <GridListTileBar
              title={game.title}
              subtitle={<span>{game.description}</span>}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
