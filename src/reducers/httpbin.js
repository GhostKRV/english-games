import { FETCH_FIREBASE_SUCCESS } from '../constants/firebase';

const initialState = {
  data: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FIREBASE_SUCCESS:
      return { ...state, data: action.payload.httpbin };

    default:
      return state;
  }
};

export default reducer;
