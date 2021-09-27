// @flow
import * as api from '../api/api.index';
import * as types from '../constants/action.types';

// ACTION GET POST
export const getPost = (id) => async (dispatch) => {
	console.log('Action getPost :>> ');
	try {
		dispatch({ type: types.START_LOADING });
		const { data } = await api.fetchPost(id);
		dispatch({ type: types.FETCH_POST, payload: { post: data } });
	} catch (error) {
		console.error(error);
	}
};

// ACTION GET POSTS
export const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({ type: types.START_LOADING });
		const {
			data: { data, currentPage, numberOfPages },
		} = await api.fetchPosts(page);
		dispatch({
			type: types.FETCH_ALL,
			payload: { data, currentPage, numberOfPages },
		});
		dispatch({ type: types.END_LOADING });
	} catch (error) {
		console.error(error.message);
	}
};

// ACTION GET POSTS BY CREATOR
export const getPostsByCreator = (name) => async (dispatch) => {
	console.log('Action getPostsByCreator :>> ');
	try {
		dispatch({ type: types.START_LOADING });
		const {
			data: { data },
		} = await api.fetchPostsByCreator(name);

		dispatch({ type: types.FETCH_BY_CREATOR, payload: { data } });
		dispatch({ type: types.END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

// ACTION GET POST BY SEARCH
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
	console.log('Action getPostsBySearch :>> ');
	try {
		dispatch({ type: types.START_LOADING });

		const {
			data: { data },
		} = await api.fetchPostsBySearch(searchQuery);

		dispatch({ type: types.FETCH_BY_SEARCH, payload: { data } });
		dispatch({ type: types.END_LOADING });
	} catch (error) {
		console.error(error);
		console.log('Error : Action getPostsBySearch :>> ');
	}
};

// ACTION CREATE POST
export const createPost = (post, history) => async (dispatch) => {
	console.log('Action createPost :>> ');
	try {
		dispatch({ type: types.START_LOADING });
		const { data } = await api.createPost(post);
		dispatch({ type: types.CREATE, payload: data });
		history.push(`/posts/${data._id}`);
	} catch (error) {
		console.error(error.message);
	}
};

// ACTION UPDATE POST
export const updatePost = (id, post) => async (dispatch) => {
	console.log('Action updatePost :>> ');
	try {
		const { data } = await api.updatePost(id, post);
		dispatch({ type: types.UPDATE, payload: data });
	} catch (error) {
		console.error(error);
	}
};

// ACTION DELETE POST
export const deletePost = (id) => async (dispatch) => {
	console.log('Action deletePost :>> ');
	try {
		await api.deletePost(id);
		dispatch({ type: types.DELETE, payload: id });
	} catch (error) {
		console.error(error);
	}
};

// ACTION LIKE POST
export const likePost = (id) => async (dispatch) => {
	console.log('Action likePost :>> ');
	const user = JSON.parse(localStorage.getItem('profile'));
	try {
		const { data } = await api.likePost(id, user?.token);
		dispatch({ type: types.LIKE, payload: data });
	} catch (error) {
		console.error(error);
	}
};

// ACTION COMMENT POST
export const commentPost = (value, id) => async (dispatch) => {
	console.log('Action commentPost :>> ');
	try {
		const { data } = await api.comment(value, id);
		dispatch({ type: types.COMMENT, payload: data });
		return data.comments;
	} catch (error) {
		console.error(error);
	}
};
