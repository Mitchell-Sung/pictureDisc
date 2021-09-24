// @flow
import * as api from '../api/api.index';
import * as types from '../constants/action.types';

// ACTION GET POST
export const getPost = (id) => async (dispatch) => {
	try {
		dispatch({ type: types.START_LOADING });
		const { data } = await api.fetchPost(id);
		dispatch({ type: types.FETCH_POST, payload: data });
		dispatch({ type: types.END_LOADING });
	} catch (error) {
		console.error(error);
	}
};

// ACTION GET POSTS
export const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({ type: types.START_LOADING });
		const { data } = await api.fetchPosts(page);
		dispatch({ type: types.FETCH_ALL, payload: data });
		dispatch({ type: types.END_LOADING });
	} catch (error) {
		console.error(error.message);
	}
};

// ACTION GET POST BY SEARCH
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
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

// ACTION CREATE POST
export const createPost = (postData, history) => async (dispatch) => {
	try {
		dispatch({ type: types.START_LOADING });
		const { data } = await api.createPost(postData);
		history.push(`/posts/${data._id}`);
		dispatch({ type: types.CREATE, payload: data });
		dispatch({ type: types.END_LOADING });
	} catch (error) {
		console.error(error.message);
	}
};

// ACTION UPDATE POST
export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post);
		dispatch({ type: types.UPDATE, payload: data });
	} catch (error) {
		console.error(error);
	}
};

// ACTION DELETE POST
export const deletePost = (id) => async (dispatch) => {
	try {
		await api.deletePost(id);
		dispatch({ type: types.DELETE, payload: id });
	} catch (error) {
		console.error(error);
	}
};

// ACTION LIKE POST
export const likePost = (id) => async (dispatch) => {
	try {
		const { data } = await api.likePost(id);
		dispatch({ type: types.LIKE, payload: data });
	} catch (error) {
		console.error(error);
	}
};

// ACTION COMMENT POST
export const commentPost = (value, id) => async (dispatch) => {
	try {
		const { data } = await api.comment(value, id);
		dispatch({ type: 'COMMENT', payload: data });
		return data.comments;
	} catch (error) {
		console.error(error);
	}
};
