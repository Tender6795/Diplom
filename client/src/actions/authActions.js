import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { apiPrefix } from '../config.json';
import { SET_CURRENT_USER } from './actionTypes';


export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function login(data) {
  return dispatch => {
    return axios.post(`${apiPrefix}/api/signin`, data).then(res => {
      const token = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}