// @flow
import { combineReducers } from 'redux';
import posts from './reducer.posts';
import auth from './reducer.auth';

export const reducers = combineReducers({ posts, auth });
