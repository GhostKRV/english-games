import React from 'react';
import ReactDOM from 'react-dom';

import Application from './containers/Application';

import { Provider } from 'react-redux';
import store from './store';

import FirebaseWrapper from './containers/FirebaseWrapper';

import './styles/index.css';

ReactDOM.render(
  <Provider store={store}>
    <FirebaseWrapper>
      <Application />
    </FirebaseWrapper>
  </Provider>,
  document.getElementById('root'),
);
