import * as types from '../constants/action.types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { isLoading: true, posts: [] }, action) => {
	console.log('### reducerPosts.js');
	switch (action.type) {
		case types.START_LOADING:
			return { ...state, isLoading: true };
		case types.END_LOADING:
			return { ...state, isLoading: false };
		case types.FETCH_POST:
			return { ...state, post: action.payload };
		case types.FETCH_ALL:
			return {
				...state,
				posts: action.payload.data,
				currentPage: action.payload.currentPage,
				numberOfPages: action.payload.numberOfPages,
			};
		case types.FETCH_BY_SEARCH:
			return { ...state, posts: action.payload };
		case types.LIKE:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === action.payload._id ? action.payload : post
				),
			};
		case types.CREATE:
			return { ...state, posts: [...state.posts, action.payload] };
		case types.UPDATE:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === action.payload._id ? action.payload : post
				),
			};
		case types.DELETE:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.payload),
			};
		default:
			return state;
	}
};
