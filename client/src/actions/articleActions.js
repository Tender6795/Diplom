import axios from 'axios';
import { apiPrefix } from '../config.json';
import * as actionTypes from './actionTypes';

export function getArticlesStart() {
  return {
    type: actionTypes.GET_ARTICLES_START,
  };
}

export function getArticlesSuccess(articles) {
  return {
    type: actionTypes.GET_ARTICLES_SUCCESS,
    articles
  };
}

export function createNewArticle(article) {
  return {
    type: actionTypes.CREATE_NEW_ARTICLE,
    article
  };
}

export function deleteArticleFromState(hash) {
  return {
    type: actionTypes.DELETE_ARTICLE,
    hash
  };
}

export function getArticles(search) {
  return dispatch => {
    dispatch(getArticlesStart());
    return axios.get(`${apiPrefix}/api/articles`
      // , {			params: { search }}
    ).then(response => {
      dispatch(getArticlesSuccess(response.data));
    });
  }
}

// export function getContactsByParams(search) {
// 	return dispatch => {
// 		dispatch(getContactsStart());
// 		return axios.get(`${apiPrefix}`, {
// 			params: { search }
// 		}).then(response => {
// 			dispatch(getContactsSuccess(response.data));
// 		});
// 	}
// }

// export function getArticlesByHash(hash) {
//   return dispatch => {
//     return axios.get(`${apiPrefix}/api/${hash}`);
//   }
// }

export function createArticle(articleData) {
//	console.dir(contactData);
  return dispatch => {
    return axios.post(`${apiPrefix}/api/article/create`, articleData);
  }
}

// export function updateContact(hash, contactData) {
// //	console.dir(contactData);
//   return dispatch => {
//     return axios.patch(`${apiPrefix}/api/${hash}`, contactData);
//   }
// }

export function deleteArticle(hash) {
  return dispatch => {
    return axios.delete(`${apiPrefix}/api/article/${hash}`)
      .then(res => {
        dispatch(deleteArticleFromState(hash));
      });
  }
}