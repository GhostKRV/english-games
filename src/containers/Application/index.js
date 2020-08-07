import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import MatchingPage from '../../pages/MatchingPage/MatchingPage';
import Fortune from '../../pages/Fortune/Fortune';
import HttpBin from '../../pages/HttpBin/HttpBin';

export default () => (
  <Router>
    <Switch>
      <Route path="/matching" component={MatchingPage} />
      <Route path="/httpbin" component={HttpBin} />
      <Route path="/fortune" component={Fortune} />
    </Switch>
  </Router>
);
