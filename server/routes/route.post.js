// @flow
import express from 'express';
import auth from '../middleware/middleware.auth.js';
import {
	getPost,
	getPosts,
	createPost,
	updatePost,
	deletePost,
	likePost,
	commentPost,
	getPostsBySearch,
	getPostsByCreator,
} from '../controllers/ctrl.post.js';

const router = express.Router();

router.get('/creator', getPostsByCreator);
router.get('/:id', getPost);
router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);

export default router;
