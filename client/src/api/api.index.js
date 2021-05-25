import axios from 'axios';

const url = 'http://localhost:7000/posts';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
