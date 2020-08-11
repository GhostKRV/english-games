import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

import config from '../../data/home_config.json';

import './index.css';

function HomePage() {
  return (
    <div className="home_content">
      <GridList cellHeight={180} className="gamesGrid">
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">
            <h1 className="headerTitle">ENGLISH GAMES</h1>
          </ListSubheader>
        </GridListTile>
        {config.map((game, index) => (
          <GridListTile key={index}>
            <a href={game.route}>
              <img
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
