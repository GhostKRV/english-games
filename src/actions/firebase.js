import {
  FETCH_FIREBASE_INIT,
  FETCH_FIREBASE_SUCCESS,
  FETCH_FIREBASE_FAIL,
  FIREBASE_TOKEN,
} from '../constants/firebase';

import { firebase } from '../utils/firebase';

export const fetchFirebaseDataInit = () => ({ type: FETCH_FIREBASE_INIT });

export const fetchFirebaseDataSuccess = (payload) => ({
  type: FETCH_FIREBASE_SUCCESS,
  payload: payload,
});

export const fetchFirebaseDataFail = (payload) => ({
  type: FETCH_FIREBASE_FAIL,
  payload: payload,
});

export const fetchFirebaseData = () => (dispatch) => {
  dispatch(fetchFirebaseDataInit());
  firebase
    .get('o/config.json', {
      params: {
        token: FIREBASE_TOKEN,
        alt: 'media',
      },
    })
    .then(({ data }) => data)
    .then((data) => {
      dispatch(fetchFirebaseDataSuccess(data));
    })
    .catch((error) => {
      if (error.response) {
        dispatch(fetchFirebaseDataFail(error.response.data.error));
      } else if (error.request) {
        dispatch(fetchFirebaseDataFail(error.message));
      } else {
        dispatch(fetchFirebaseDataFail(error.message));
      }
    });
};
