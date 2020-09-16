import * as constants from '../constants/home';
import {home} from '../data/index.json';

const getHomeConfiguration = (payload) => ({
  type: constants.GET_HOME_CONFIGURATION,
  payload: payload,
});

export const fetchHomeConfiguration = () => (dispatch) => {
  dispatch(getHomeConfiguration(home));
};
