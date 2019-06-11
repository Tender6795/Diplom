import { combineReducers } from 'redux';
import auth from './auth';
import articles from './articles';

export default combineReducers({ auth,articles });