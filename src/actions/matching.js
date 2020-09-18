import * as constants from '../constants/matching';
import * as commonConstants from '../constants/common';

import axios from 'axios';

const url =
  'https://firebasestorage.googleapis.com/v0/b/english-games-df57f.appspot.com/o/config.json?alt=media&token=8bab58e3-e345-4f34-8c41-11f1a915bdf1';

const getDataInit = (payload) => ({
  type: commonConstants.GET_DATA_INIT,
  payload: payload,
});
const getDataError = (payload) => ({
  type: commonConstants.GET_DATA_ERROR,
  payload: payload,
});
const getMatchingGameData = (payload) => ({
  type: constants.GET_MATCHING_GAME_DATA,
  payload: payload,
});

export const fetchMatchingGameData = () => (dispatch) => {
  dispatch(getDataInit(false));
  axios({
    method: 'get',
    baseURL: url,
  })
    .then((response) => {
      dispatch(getMatchingGameData(response.data.matching));
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
