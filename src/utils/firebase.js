import axios from 'axios';
import { FIREBASE_URI } from '../constants/firebase';

export const firebase = axios.create({
  baseURL: FIREBASE_URI,
});
