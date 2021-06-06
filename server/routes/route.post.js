import express from 'express';
import auth from '../middleware/middleware.auth.js';
import {
	getPosts,
	createPost,
	updatePost,
	deletePost,
	likePost,
	getPostsBySearch,
} from '../controllers/ctrl.post.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;
