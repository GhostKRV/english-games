import React from 'react';
import ReactDOM from 'react-dom';

import Application from './containers/Application/';

import { Provider } from 'react-redux';
import store from './store';

import './styles/index.css';

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('root'),
);
