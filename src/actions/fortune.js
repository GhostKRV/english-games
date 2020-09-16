import * as constants from '../constants/fortune';
import {fortune} from '../data/index.json';

const getFortuneData = (payload) => ({
  type: constants.GET_FORTUNE_DATA,
  payload: payload,
});

export const fetchFortuneData = () => (dispatch) => {
  dispatch(getFortuneData(fortune));
};
