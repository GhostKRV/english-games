import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MatchingCard from '../../pages/MatchingPage';
import Fortune from '../../pages/Fortune';
import HttpBin from '../../pages/HttpBin';
import HomePage from '../../pages/HomePage';

import NavBar from '../../components/NavBar';

export default () => (
  <Router>
    <NavBar />
    <Switch>
      <Route path="/matching" component={MatchingCard} />
      <Route path="/httpbin" component={HttpBin} />
      <Route path="/fortune" component={Fortune} />
      <Route exact path="/" component={HomePage} />
    </Switch>
  </Router>
);
