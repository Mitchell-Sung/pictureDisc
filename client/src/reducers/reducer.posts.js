// @flow
import * as types from '../constants/action.types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { isLoading: true, posts: [] }, action) => {
	switch (action.type) {
		case types.START_LOADING:
			return { ...state, isLoading: true };
		case types.END_LOADING:
			return { ...state, isLoading: false };
		case types.FETCH_POST:
			return { ...state, isLoading: false, post: action.payload };
		case types.FETCH_ALL:
			return {
				...state,
				isLoading: false,
				posts: action.payload.data,
				currentPage: action.payload.currentPage,
				numberOfPages: action.payload.numberOfPages,
			};
		case types.FETCH_BY_SEARCH:
			return { ...state, isLoading: false, posts: action.payload };
		case types.LIKE:
			return {
				...state,
				isLoading: false,
				posts: state.posts.map((post) =>
					post._id === action.payload._id ? action.payload : post
				),
			};
		case types.COMMENT:
			return {
				...state, // return all the other posts normally...
				posts: state.posts.map((post) => {
					// change the post that just received a comment...
					if (post._id === action.payload._id) {
						return action.payload;
					}
					return post;
				}),
			};
		case types.CREATE:
			return {
				...state,
				isLoading: false,
				posts: [...state.posts, action.payload],
			};
		case types.UPDATE:
			return {
				...state,
				isLoading: false,
				posts: state.posts.map((post) =>
					post._id === action.payload._id ? action.payload : post
				),
			};
		case types.DELETE:
			return {
				...state,
				isLoading: false,
				posts: state.posts.filter((post) => post._id !== action.payload),
			};
		default:
			return state;
	}
};
