import * as constants from '../constants/quiz';

const initialState = {
  quiz: [],
  testDetails: {questions: []},
  testQuestion: {answers: []},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_QUESTIONS: {
      return { ...state, quiz: action.payload };
    }
    case constants.GET_TEST_DETAILS:
      return { ...state, testDetails: action.payload };

    case constants.GET_SELECTED_QUESTIONS:
      return {
        ...state,
        testQuestion: state.testDetails.questions[action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
