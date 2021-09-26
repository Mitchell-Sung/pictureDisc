// import axios from 'axios';
import apiAxios from '../../libraries/apiAxios.js';

// const API = axios.create({ baseURL: 'http://localhost:7000' });

// This code is going to happen before all of above requests
// because it has to send the token back to back-end so that
// the back-end middleware can verify that it is logged in.
// API.interceptors.request.use((req) => {
// 	if (localStorage.getItem('profile')) {
// 		req.headers.authorization = `Bearer ${
// 			JSON.parse(localStorage.getItem('profile')).token
// 		}`;
// 	}
// 	return req;
// });

const apiCommentPost = (value, id) => {
	apiAxios();
	API.post(`/posts/${id}/commentPost`, { value });
};

export default apiCommentPost;
