import axios from 'axios';
import { apiPrefix } from '../config.json';
import * as actionTypes from './actionTypes';

// export function createComment(comment) {
//   return {
//     type: actionTypes.CREATE_COMMENT,
//   }
// }

export function startCreateComment() {
  return {
    type: actionTypes.START_CREATE_COMMENT,
  }
}

export function createNewComment(article) {
  return {
    type: actionTypes.CREATE_COMMENT,
    article
  }
}

// export function deleteComment(article) {
//   return{
//     type: actionTypes.DELETE_COMMENT,
//     article
//   }
// }

export function createComment(hash,commentData) {
  return dispatch => {
    return axios.post(`${apiPrefix}/api/comment/${hash}`, commentData);
  }
}
export function deleteComment(hashArticle,hashComment) {
  return dispatch => {
    return axios.delete(`${apiPrefix}/api/comment/${hashArticle}/${hashComment}`);
  }
}