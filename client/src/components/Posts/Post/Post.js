// @flow
import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { deletePost, likePost, getPost } from '../../../actions/action.posts';
// import modules related to styles
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
	// GET USER INFO FROM LOCAL STORAGE
	const user = JSON.parse(localStorage.getItem('profile'));

	// Declear methods
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();

	// use state
	const [likes, setLikes] = useState(post?.likes);

	// Likes()
	const Likes = () => {
		if (likes.length > 0) {
			return likes.find((like) => like === userId) ? (
				<>
					<ThumbUpAltIcon fontSize='small' />
					&nbsp;
					{likes.length > 2
						? `You and ${likes.length - 1} others`
						: `${likes.length} like${likes.length > 1 ? 's' : ''}`}
				</>
			) : (
				<>
					<ThumbUpAltOutlined fontSize='small' />
					&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
				</>
			);
		}
		return (
			<>
				<ThumbUpAltOutlined fontSize='small' />
				&nbsp;Like
			</>
		);
	};

	// openPost()
	const openPost = (e) => {
		dispatch(getPost(post._id));
		history.push(`/posts/${post._id}`);
	};
	// http://localhost:3000/posts/614f88937b724a2973dda024

	// get userId
	const userId = user?.result?.googleId || user?.result?._id;

	// hasLikedPost()
	const hasLikedPost = post.likes.find((like) => like === userId);

	// handleLike()
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
			<ButtonBase className={classes.cardAction} onClick={openPost}>
				<CardMedia
					className={classes.media}
					image={post?.selectedFile}
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
					<div className={classes.overlay2} name='edit'>
						<Button
							style={{ color: 'white' }}
							size='small'
							onClick={(e) => {
								e.stopPropagation();
								setCurrentId(post._id);
							}}
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
						{post.message.split(' ').splice(0, 20).join(' ')}...
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
						color='secondary'
						onClick={() => dispatch(deletePost(post._id))}
					>
						<DeleteIcon fontSize='small' /> &nbsp; Delete
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

// TODO: Implement props types.

export default Post;
