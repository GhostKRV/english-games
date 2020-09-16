import * as constants from '../constants/httpbin';
import { httpbin } from '../data/index.json';

const getHttpBinData = (payload) => ({
  type: constants.GET_HTTPBIN_DATA,
  payload: payload,
});

export const fetchHttpBinData = () => (dispatch) => {
  dispatch(getHttpBinData(httpbin));
};
