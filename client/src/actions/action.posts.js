import * as api from '../api/api.index';
import {
	CREATE,
	FETCH_ALL,
	UPDATE,
	DELETE,
	LIKE,
} from '../constants/action.types';

export const getPosts = () => async (dispatch) => {
	try {
		const { data } = await api.fetchPosts();
		dispatch({ type: FETCH_ALL, payload: data });
	} catch (error) {
		console.error(error.message);
	}
};

export const createPost = (postDate) => async (dispatch) => {
	try {
		const { data } = await api.createPost(postDate);
		dispatch({ type: CREATE, payload: data });
	} catch (error) {
		console.error(error.message);
	}
};

export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post);
		dispatch({ type: UPDATE, payload: data });
	} catch (error) {
		console.error(error);
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		await api.deletePost(id);
		dispatch({ type: DELETE, payload: id });
	} catch (error) {
		console.error(error);
	}
};

export const likePost = (id) => async (dispatch) => {
	try {
		const { data } = await api.likePost(id);
		dispatch({ type: LIKE, payload: data });
	} catch (error) {
		console.error(error);
	}
};
