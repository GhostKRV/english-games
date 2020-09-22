import { FETCH_FIREBASE_SUCCESS } from '../constants/firebase';

const initialState = { data: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FIREBASE_SUCCESS:
      return { ...state, data: action.payload.home };

    default:
      return state;
  }
};
