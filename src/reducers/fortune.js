import * as constants from '../constants/fortune';

const initialState = {
  fortune: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_FORTUNE_DATA:
      return { ...state, fortune: action.payload};

    default:
      return state;
  }
};

export default reducer;
