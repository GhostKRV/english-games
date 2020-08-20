import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MatchingCard from '../../pages/MatchingPage';
import Fortune from '../../pages/Fortune';
import HttpBin from '../../pages/HttpBin';
import HomePage from '../../pages/HomePage';
import Quiz from '../../pages/Quiz';
import Question from '../../components/Question';


import NavBar from '../../components/NavBar';

export default () => (
  <Router>
    <NavBar />
    <Switch>
      <Route path="/quiz/0" component={Question} />
      <Route path="/matching" component={MatchingCard} />
      <Route path="/httpbin" component={HttpBin} />
      <Route path="/fortune" component={Fortune} />
      <Route path="/quiz" component={Quiz} />
      <Route exact path="/" component={HomePage} />
    </Switch>
  </Router>
);
