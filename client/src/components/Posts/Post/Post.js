// @flow
import React, { Fragment, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { deletePost, likePost, getPost } from '../../../actions/action.posts';

import useStyles from './Post.styles';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const Post = ({ post, setCurrentId }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();

	const [likes, setLikes] = useState(post?.likes);

	// GET USER INFO FROM LOCAL STORAGE
	const user = JSON.parse(localStorage.getItem('profile'));

	// IMPLEMENT LIKES ICON WITH DISPLAY
	const Likes = () => {
		if (likes.length > 0) {
			return likes.find((like) => like === userId) ? (
				<Fragment>
					<ThumbUpAltIcon fontSize='small' />
					&nbsp;
					{likes.length > 2
						? `You and ${likes.length - 1} others`
						: `${likes.length} like${likes.length > 1 ? 's' : ''}`}
				</Fragment>
			) : (
				<Fragment>
					<ThumbUpAltOutlined fontSize='small' />
					&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
				</Fragment>
			);
		}
		return (
			<Fragment>
				<ThumbUpAltOutlined fontSize='small' />
				&nbsp;Like
			</Fragment>
		);
	};

	// OPEN POST
	const openPost = () => {
		history.push(`/posts/${post._id}`);
		dispatch(getPost(post._id, history));
	};

	// GET USER ID FROM USER MODEL
	const userId = user?.result.googleId || user?.result?._id;

	// VALIDATE WHAT USER POSTS LIKE BUTTON
	const hasLikedPost = post.likes.find(
		(like) => like === (user?.result?.googleId || user?.result?._id)
	);

	// HANDLE CLICK LIKE
	const handleLike = async () => {
		dispatch(likePost(post._id));
		if (hasLikedPost) {
			setLikes(post.likes.filter((id) => id !== userId));
		} else {
			setLikes([...post.likes, userId]);
		}
	};

	return (
		<Card className={classes.card} raised elevation={6}>
			<ButtonBase className={classes.cardActions} onClick={openPost}>
				<CardMedia
					className={classes.media}
					image={
						post.selectedFile ||
						'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
					}
					title={post.title}
				/>
				<div className={classes.overlay}>
					<Typography variant='h6'>{post.name}</Typography>
					<Typography variant='body2'>
						{moment(post.createdAt).fromNow()}
					</Typography>
				</div>
				{(user?.result?.googleId === post?.creator ||
					user?.result?._id === post?.creator) && (
					<div className={classes.overlay2}>
						<Button
							style={{ color: 'white' }}
							size='small'
							onClick={() => setCurrentId(post._id)}
						>
							<MoreHorizIcon fontSize='default' />
						</Button>
					</div>
				)}
				<div className={classes.details}>
					<Typography variant='body2' color='textSecondary' component='h2'>
						{post.tags.map((tag) => `#${tag} `)}
					</Typography>
				</div>
				<Typography
					className={classes.title}
					gutterBottom
					variant='h5'
					component='h2'
				>
					{post.title}
				</Typography>
				<CardContent>
					<Typography variant='body2' color='textSecondary' component='p'>
						{post.message}
					</Typography>
				</CardContent>
			</ButtonBase>
			<CardActions className={classes.cardActions}>
				<Button
					size='small'
					color='primary'
					disabled={!user?.result}
					onClick={handleLike}
				>
					<Likes />
				</Button>
				{(user?.result?.googleId === post?.creator ||
					user?.result?._id === post?.creator) && (
					<Button
						size='small'
						color='primary'
						onClick={() => dispatch(deletePost(post._id))}
					>
						<DeleteIcon fontSize='small' /> Delete
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default Post;
