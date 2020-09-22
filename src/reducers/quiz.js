import * as constants from '../constants/quiz';
import { FETCH_FIREBASE_SUCCESS } from '../constants/firebase';

const initialState = {
  data: [],
  testDetails: { questions: [] },
  testQuestion: { answers: [] },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FIREBASE_SUCCESS: {
      return { ...state, data: action.payload.quiz };
    }
    case constants.GET_TEST_DETAILS:
      return { ...state, testDetails: state.data[action.payload] };

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
