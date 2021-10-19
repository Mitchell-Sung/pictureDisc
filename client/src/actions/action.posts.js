import * as api from '../api/api.index';
import * as types from '../constants/action.types';

// getPost()
export const getPost = (id) => async (dispatch) => {
	try {
		dispatch({ type: types.START_LOADING });
		const { data } = await api.fetchPost(id);
		dispatch({ type: types.FETCH_POST, payload: { post: data } });
		dispatch({ type: types.END_LOADING });
	} catch (error) {
		console.error('action getPost :>> ', error.message);
	}
};

// getPosts()
export const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({ type: types.START_LOADING });
		const { data } = await api.fetchPosts(page);
		dispatch({
			type: types.FETCH_ALL,
			payload: data,
		});
		dispatch({ type: types.END_LOADING });
	} catch (error) {
		console.error('action getPosts :>> ', error.message);
	}
};

// getPostsBySearch
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

// createPost
export const createPost = (post, history) => async (dispatch) => {
	try {
		dispatch({ type: types.START_LOADING });
		const { data } = await api.createPost(post);
		history.push(`/posts/${data._id}`);
		dispatch({ type: types.CREATE, payload: data });
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

// commentPost()
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
