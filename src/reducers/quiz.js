import quizData from '../data/quiz.json';
import * as constants from '../constants/quiz';

const initialState = {
  tests: quizData,
  selectedTest: {},
  selectedQuestion: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_TEST_DETAILS:
      return { ...state, selectedTest: state.tests[action.payload] };

    case constants.GET_SELECTED_QUESTIONS:
      return {
        ...state,
        selectedQuestion: state.selectedTest.questions[action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
