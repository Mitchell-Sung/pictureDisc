import express from 'express';
import { getPosts, createPost } from '../controllers/post.ctrl.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);

export default router;
