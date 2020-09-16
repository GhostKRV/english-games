import * as constants from '../constants/httpbin';

const initialState = {
  httpbin: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_HTTPBIN_DATA:
      return { ...state, httpbin: action.payload};

    default:
      return state;
  }
};

export default reducer;
