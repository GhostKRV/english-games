import * as constants from '../constants/matching';
import { matching } from '../data/index.json';

const getMatchingGameData = (payload) => ({
  type: constants.GET_MATCHING_GAME_DATA,
  payload: payload,
});

export const fetchMatchingGameData = () => (dispatch) => {
  dispatch(getMatchingGameData(matching));
};
