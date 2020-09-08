import quizData from '../data/quiz.json';
import * as constants from '../constants/quiz';

const initialState = {
  tests: quizData,
  selectedTest: {},
  selectedQuestion: null,
  selectedAnswer: { selectedAnswer: null, correctAnswer: null },
  testAnswers: [],
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

    case constants.SET_SELECTED_ANSWER:
      return {
        ...state,
        selectedAnswer: action.payload,
      };

    case constants.SET_TEST_ANSWERS:
      return {
        ...state,
        testAnswers: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
