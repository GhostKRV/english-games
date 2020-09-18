import * as constants from '../constants/home';
import * as commonConstants from '../constants/common';

import axios from 'axios';

const url =
  'https://firebasestorage.googleapis.com/v0/b/english-games-df57f.appspot.com/o/config.json?alt=media&token=8bab58e3-e345-4f34-8c41-11f1a915bdf1';

const getDataInit = (payload) => ({
  type: commonConstants.GET_DATA_INIT,
  payload: payload,
});
const getDataInitNavbar = (payload) => ({
  type: commonConstants.GET_DATA_INIT_NAVBAR,
  payload: payload,
});
const getDataError = (payload) => ({
  type: commonConstants.GET_DATA_ERROR,
  payload: payload,
});
const getHomeConfiguration = (payload) => ({
  type: constants.GET_HOME_CONFIGURATION,
  payload: payload,
});
const getDataNavbarError = (payload) => ({
  type: commonConstants.GET_DATA_NAVBAR_ERROR,
  payload: payload,
});

export const fetchDataInitNavbar = () => (dispatch) => {
  dispatch(getDataInitNavbar(false));

  axios({
    method: 'get',
    baseURL: url,
  })
    .then((response) => {
      dispatch(getHomeConfiguration(response.data.home));
    })
    .catch((error) => {
      if (error.response) {
        dispatch(getDataNavbarError(error.response.data));
      } else if (error.request) {
        dispatch(getDataNavbarError(error.request));
      } else {
        dispatch(getDataNavbarError(error.message));
      }
    });
};

export const fetchHomeConfiguration = () => (dispatch) => {
  dispatch(getDataInit(false));

  axios({
    method: 'get',
    baseURL: url,
  })
    .then((response) => {
      dispatch(getHomeConfiguration(response.data.home));
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
