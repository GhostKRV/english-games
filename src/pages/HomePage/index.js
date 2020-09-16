import React from 'react';

import {
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
} from '@material-ui/core/';

import { makeStyles } from '@material-ui/core/styles';

import { homeConfig } from '../../data/index.json';

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

function HomePage() {
  const classes = useStyles();
  return (
    <div className={classes.home_content}>
      <GridList cellHeight={180} className={classes.gamesGrid}>
        <GridListTile cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">
            <h1 className={classes.headerTitle}>ENGLISH GAMES</h1>
          </ListSubheader>
        </GridListTile>
        {homeConfig.map((game, index) => (
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
}

export default HomePage;
