import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

import config from '../../data/home_config.json';

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

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup
        size="large"
        color="primary"
        aria-label="small outlined button group"
      >
        {config.map((game, index) => (
          <Button size="large" key={index} href={game.route}>
            {game.title}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
