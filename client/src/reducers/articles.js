import * as actionTypes from '../actions/actionTypes';

const initialState = ({
  loading: false,
  articles: []
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ARTICLES_SUCCESS:
      return {
        loading: false,
        articles: action.articles
      };
    case actionTypes.GET_ARTICLES_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.CREATE_NEW_ARTICLE:
      return {
        ...state,
        articles: [...state.articles, action.article]
      };
    case actionTypes.DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(c => c.hash !== action.hash)
      };
    default:
      return state;
  }
};