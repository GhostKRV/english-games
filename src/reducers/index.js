import { combineReducers } from 'redux';
import quiz from './quiz';
import home from './home';
import matching from './matching';
import fortune from './fortune';
import httpbin from './httpbin';
import common from './common'

export default combineReducers({ quiz, home, matching, fortune, httpbin, common });
