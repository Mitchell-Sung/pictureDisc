import * as api from '../api/api.index.js';
import { CREATE, FETCH_ALL } from '../constants/action.types';

// Action Creators
export const getPosts = () => async (dispatch) => {
	try {
		const { data } = await api.fetchPosts();
		dispatch({ type: 'FETCH_ALL', payload: data });
	} catch (error) {
		console.error(error.message);
	}
};

export const createPost = (postData) => async (dispatch) => {
	console.log(`createPost`);
	try {
		const { data } = await api.createPost(postData);
		console.log(`data`, { data });
		dispatch({ type: CREATE, payload: data });
	} catch (error) {
		console.error(error.message);
	}
};
