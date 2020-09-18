import * as constants from '../constants/fortune';
import * as commonConstants from '../constants/common';

import axios from 'axios';

const url =
  'https://firebasestorage.googleapis.com/v0/b/english-games-df57f.appspot.com/o/config.json?alt=media&token=8bab58e3-e345-4f34-8c41-11f1a915bdf1';

const getFortuneData = (payload) => ({
  type: constants.GET_FORTUNE_DATA,
  payload: payload,
});
const getDataInit = (payload) => ({
  type: commonConstants.GET_DATA_INIT,
  payload: payload,
});
const getDataError = (payload) => ({
  type: commonConstants.GET_DATA_ERROR,
  payload: payload,
});

export const fetchFortuneData = () => (dispatch) => {
  dispatch(getDataInit(false));

  axios({
    method: 'get',
    baseURL: url,
  })
    .then((response) => {
      dispatch(getFortuneData(response.data.fortune));
    })
    .catch((error) => {
      if (error.response) {
        dispatch(getDataError(error.response.data));
      } else if (error.request) {
        dispatch(getDataError(error.request));
      } else {
        dispatch(getDataError(error.message));
      }
    });
};
