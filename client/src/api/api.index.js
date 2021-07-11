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

export const fetchPost = (id) => {
	return API.get(`/posts/${id}`);
};

export const fetchPosts = (page) => {
	return API.get(`/posts?page=${page}`);
};

export const fetchPostsBySearch = (searchQuery) => {
	return API.get(
		`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${
			searchQuery.tags
		}`
	);
};

export const createPost = (newPost) => {
	return API.post('/posts', newPost);
};

// UPDATE POST
export const updatePost = (id, updatedPost) =>
	API.patch(`./posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// POST COMMENT
export const comment = (value, id) =>
	API.post(`/posts/${id}/commentPost`, { value });

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
