import {
  FETCH_FIREBASE_INIT,
  FETCH_FIREBASE_SUCCESS,
  FETCH_FIREBASE_FAIL,
} from '../constants/firebase';

const initialState = {
  isLoading: true,
  data: {},
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FIREBASE_INIT:
      return { ...state, isLoading: true };

    case FETCH_FIREBASE_SUCCESS:
      return { ...state, isLoading: false, data: action.payload };

    case FETCH_FIREBASE_FAIL:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};
