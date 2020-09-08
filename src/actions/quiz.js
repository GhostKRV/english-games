import * as constants from '../constants/quiz';

const getTestDetails = (payload) => ({
  type: constants.GET_TEST_DETAILS,
  payload: payload,
});
export const fetchTestDetails = (id) => (dispatch) => {
  dispatch(getTestDetails(id));
};

const getSelectedQuestions = (payload) => ({
  type: constants.GET_SELECTED_QUESTIONS,
  payload: payload,
});
export const fetchSelectedQuestions = (id) => (dispatch) => {
  dispatch(getSelectedQuestions(id));
};

const setSelectedAnswer = (payload) => ({
  type: constants.SET_SELECTED_ANSWER,
  payload: payload,
});
export const fetchSelectedAnswer = (id) => (dispatch) => {
  dispatch(setSelectedAnswer(id));
};

const setTestAnswers = (payload) => ({
  type: constants.SET_TEST_ANSWERS,
  payload: payload,
});
export const fetchTestAnswers = (id) => (dispatch) => {
  dispatch(setTestAnswers(id));
};
