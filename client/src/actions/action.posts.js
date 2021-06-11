// @flow
import * as api from '../api/api.index';
import * as types from '../constants/action.types';

export const getPost = (id) => async (dispatch) => {
	console.log('### getPost');
	try {
		dispatch({ type: types.START_LOADING });
		const { data } = await api.fetchPost(id);
		dispatch({ type: types.FETCH_POST, payload: data });
		dispatch({ type: types.END_LOADING });
	} catch (error) {
		console.error(error);
	}
};

export const getPosts = (page) => async (dispatch) => {
	console.log('### getPosts');

	try {
		dispatch({ type: types.START_LOADING });
		const { data } = await api.fetchPosts(page);
		dispatch({ type: types.FETCH_ALL, payload: data });
		dispatch({ type: types.END_LOADING });
	} catch (error) {
		console.error(error.message);
	}
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
	console.log('### getPostsBySearch');

	try {
		dispatch({ type: types.START_LOADING });
		const {
			data: { data },
		} = await api.fetchPostsBySearch(searchQuery);
		dispatch({ type: types.FETCH_BY_SEARCH, payload: data });
		dispatch({ type: types.END_LOADING });
	} catch (error) {
		console.error(error);
	}
};

export const createPost = (postDate) => async (dispatch) => {
	console.log('### createPost');

	try {
		dispatch({ type: types.START_LOADING });
		const { data } = await api.createPost(postDate);
		dispatch({ type: types.CREATE, payload: data });
		dispatch({ type: types.END_LOADING });
	} catch (error) {
		console.error(error.message);
	}
};

export const updatePost = (id, post) => async (dispatch) => {
	console.log('### updatePost');

	try {
		const { data } = await api.updatePost(id, post);
		dispatch({ type: types.UPDATE, payload: data });
	} catch (error) {
		console.error(error);
	}
};

export const deletePost = (id) => async (dispatch) => {
	console.log('### deletePost');

	try {
		await api.deletePost(id);
		dispatch({ type: types.DELETE, payload: id });
	} catch (error) {
		console.error(error);
	}
};

export const likePost = (id) => async (dispatch) => {
	console.log('### likePost');
	try {
		const { data } = await api.likePost(id);
		dispatch({ type: types.LIKE, payload: data });
	} catch (error) {
		console.error(error);
	}
};
