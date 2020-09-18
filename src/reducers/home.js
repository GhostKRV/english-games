import * as constants from '../constants/home';

const initialState = {
  home: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_HOME_CONFIGURATION:
      return { ...state, home: action.payload};  
    default:
      return state;
  }
};

export default reducer;
