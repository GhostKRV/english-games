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

const getQuestionAnswers = (payload) => ({
  type: constants.GET_QUESTION_ANSWERS,
  payload: payload,
});
export const fetchQuestionAnswers = (id) => (dispatch) => {
  dispatch(getQuestionAnswers(id));
};
