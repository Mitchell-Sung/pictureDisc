import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:7000' });

// This code is going to happen before all of above requests
// because it has to send the token back to back-end so that
// the back-end middleware can verify that it is logged in.
API.interceptors.request.use((req) => {
	console.log('### API.interceptors');
	if (localStorage.getItem('profile')) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem('profile')).token
		}`;
	}
	return req;
});

export const fetchPost = (id) => {
	console.log('### fetchPost');
	return API.get(`/posts/${id}`);
};

export const fetchPosts = (page) => {
	console.log('### fetchPosts');
	return API.get(`/posts?page=${page}`);
};

export const fetchPostsBySearch = (searchQuery) => {
	console.log('### fetchPostsBySearch');
	return API.get(
		`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`
	);
};
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`./posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
