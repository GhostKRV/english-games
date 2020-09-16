import * as constants from '../constants/quiz';
import { quiz } from '../data/index.json';

const getQuestions = (payload) => ({
  type: constants.GET_QUESTIONS,
  payload: payload,
});
export const fetchQuestions = () => (dispatch) => {
  dispatch(getQuestions(quiz));
};

const getTestDetails = (payload) => ({
  type: constants.GET_TEST_DETAILS,
  payload: payload,
});
export const fetchTestDetails = (id) => (dispatch) => {
  dispatch(getTestDetails(quiz[id]));
};

const getSelectedQuestions = (payload) => ({
  type: constants.GET_SELECTED_QUESTIONS,
  payload: payload,
});
export const fetchSelectedQuestions = (id) => (dispatch) => {
  dispatch(getSelectedQuestions(id));
};
