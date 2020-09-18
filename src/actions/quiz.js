import * as constants from '../constants/quiz';
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
const getQuestions = (payload) => ({
  type: constants.GET_QUESTIONS,
  payload: payload,
});
export const fetchQuestions = () => (dispatch) => {
  dispatch(getDataInit(false));
  axios({
    method: 'get',
    baseURL: url,
  })
    .then((response) => {
      dispatch(getQuestions(response.data.quiz));
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

const getTestDetails = (payload) => ({
  type: constants.GET_TEST_DETAILS,
  payload: payload,
});
export const fetchTestDetails = (id) => (dispatch) => {
  dispatch(getDataInit(false));

  axios({
    method: 'get',
    baseURL: url,
  })
    .then((response) => {
      dispatch(getTestDetails(response.data.quiz[id]));
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

const getSelectedQuestions = (payload) => ({
  type: constants.GET_SELECTED_QUESTIONS,
  payload: payload,
});
export const fetchSelectedQuestions = (id) => (dispatch) => {
  dispatch(getSelectedQuestions(id));
};
