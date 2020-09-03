import quizData from '../data/quiz.json';
import * as constants from '../constants/quiz';

const initialState = {
  tests: quizData,
  selectedTest: null,
  questions: null,
  answers: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_TEST_DETAILS:
      return { ...state, selectedTest: state.tests[action.payload] };
    case constants.GET_SELECTED_QUESTIONS:
      return {
        ...state,
        questions: state.selectedTest.questions[action.payload],
      };
    case constants.GET_QUESTION_ANSWERS:
      return {
        ...state,
        answers: state.questions.answers,
      };
    default:
      return state;
  }
};

export default reducer;
