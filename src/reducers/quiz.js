import quizData from '../data/quiz.json';
import * as constants from '../constants/quiz';

const initialState = {
  tests: quizData,
  selectedTest: {},
  selectedQuestion: null,
  answers: [],
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

    case constants.GET_QUESTION_ANSWERS:
      return {
        ...state,
        answers: state.selectedQuestion.answers,
      };

    default:
      return state;
  }
};

export default reducer;
