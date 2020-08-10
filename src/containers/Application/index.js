import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MatchingCard from '../../pages/MatchingPage';
import Fortune from '../../pages/Fortune';
import HttpBin from '../../pages/HttpBin';

export default () => (
  <Router>
    <Switch>
      <Route path="/matching" component={MatchingCard} />
      <Route path="/httpbin" component={HttpBin} />
      <Route path="/fortune" component={Fortune} />
    </Switch>
  </Router>
);
