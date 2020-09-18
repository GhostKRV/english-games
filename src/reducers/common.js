import * as constants from '../constants/common';

const initialState = {
  init: true,
  initNavbar: true,
  error: '',
  navbarError: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_DATA_INIT:
      return { ...state, init: action.payload };
    case constants.GET_DATA_INIT_NAVBAR:
      return { ...state, initNavbar: action.payload };
    case constants.GET_DATA_NAVBAR_ERROR:
      return { ...state, navbarError: action.payload };
    case constants.GET_DATA_ERROR:
      return { ...state, init: false, error: action.payload };

    default:
      return state;
  }
};

export default reducer;
