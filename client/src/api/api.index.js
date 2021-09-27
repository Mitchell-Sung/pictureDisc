// @flow
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:7000' });

// This code is going to happen before all of above requests
// because it has to send the token back to back-end so that
// the back-end middleware can verify that it is logged in.
API.interceptors.request.use((req) => {
	if (localStorage.getItem('profile')) {
		req.headers.authorization = `Bearer ${
			JSON.parse(localStorage.getItem('profile')).token
		}`;
	}
	return req;
});

// FETCH POST
export const fetchPost = (id) => {
	return API.get(`/posts/${id}`);
};

// FETCH POSTS
export const fetchPosts = (page) => {
	return API.get(`/posts?page=${page}`);
};

export const fetchPostsByCreator = (name) => {
	return API.get(`/posts/creator?name=${name}`);
};

// FETCH POSTS BY SEARCH
export const fetchPostsBySearch = (searchQuery) => {
	return API.get(
		`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${
			searchQuery.tags
		}`
	);
};

// CREATE POST
export const createPost = (newPost) => {
	return API.post('/posts', newPost);
};

// UPDATE POST
export const updatePost = (id, updatedPost) => {
	return API.patch(`./posts/${id}`, updatedPost);
};

export const deletePost = (id) => {
	return API.delete(`/posts/${id}`);
};

export const likePost = (id) => {
	return API.patch(`/posts/${id}/likePost`);
};

// POST COMMENT
export const comment = (value, id) => {
	return API.post(`/posts/${id}/commentPost`, { value });
};

// SIGN IN FOR USER
export const signIn = (formData) => {
	return API.post('/user/signin', formData);
};
// SIGN UP FOR USER
export const signUp = (formData) => {
	return API.post('/user/signup', formData);
};
