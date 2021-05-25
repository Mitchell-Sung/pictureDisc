import { combineReducers } from 'redux';
import posts from './reducer.posts';

export default combineReducers({
	posts: posts,
});
