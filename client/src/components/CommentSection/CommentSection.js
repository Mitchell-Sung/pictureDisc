import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/action.posts.js';

import useStyles from './CommentSection.styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const CommentSection = ({ post }) => {
	// Get a user from localStorage
	const user = JSON.parse(localStorage.getItem('profile'));

	// Declare methods
	const classes = useStyles();
	const dispatch = useDispatch();
	const commentsRef = useRef();

	// useState()
	const [comments, setComments] = useState(post?.comments);
	const [comment, setComment] = useState('');

	const handleComment = async () => {
		const newComments = await dispatch(
			commentPost(`${user?.result?.name}: ${comment}`, post._id)
		);
		setComment('');
		setComments(newComments);

		commentsRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<div>
			<div className={classes.commentsOuterContainer}>
				<div className={classes.commentsInnerContainer}>
					<Typography gutterBottom variant='h6'>
						Comments
					</Typography>
					{comments.map((c, i) => (
						<Typography key={i} gutterBottom variant='subtitle1'>
							<strong>{c.split(': ')[0]}</strong>
							{c.split(':')[1]}
						</Typography>
					))}
					<div ref={commentsRef} />
				</div>
				<div style={{ width: '70%' }}>
					<Typography gutterBottom variant='h6'>
						Write a comment
					</Typography>
					<TextField
						fullWidth
						rows={4}
						variant='outlined'
						label='Comment'
						multiline
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					<br />
					<Button
						style={{ marginTop: '10px' }}
						fullWidth
						disabled={!comment.length}
						color='primary'
						variant='contained'
						onClick={handleComment}
					>
						Comment
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CommentSection;
