import * as constants from '../constants/httpbin';
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
const getHttpBinData = (payload) => ({
  type: constants.GET_HTTPBIN_DATA,
  payload: payload,
});

export const fetchHttpBinData = () => (dispatch) => {
  dispatch(getDataInit(false));
  axios({
    method: 'get',
    baseURL: url,
  })
    .then((response) => {
      dispatch(getHttpBinData(response.data.httpbin));
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data)
        dispatch(getDataError(error.response.data));
      } else if (error.request) {
        dispatch(getDataError(error.request));
      } else {
        dispatch(getDataError(error.message));
      }
    });
};
