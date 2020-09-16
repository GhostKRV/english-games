import * as constants from '../constants/matching';

const initialState = {
  matching: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_MATCHING_GAME_DATA:
      return { ...state, matching: action.payload };

    default:
      return state;
  }
};

export default reducer;
