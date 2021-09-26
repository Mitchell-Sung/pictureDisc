import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/action.posts';

import useStyles from './CommentSection.styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const CommentSection = ({ post }) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const commentsRef = useRef();

	const [comments, setComments] = useState([1, 2, 3, 4]);
	const [comment, setComment] = useState('');

	const user = JSON.parse(localStorage.getItem('user'));

	const handleClick = async () => {
		const finalComment = `${user.result.name}: ${comment}`;
		const newComments = await dispatch(commentPost(finalComment, post._id));
		setComments(newComments);
		setComment('');
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
							Comment {i}
						</Typography>
					))}
				</div>
				<div style={{ width: '70%' }}>
					<Typography gutterBottom variant='h6'>
						Write a Comment
					</Typography>
					<TextField
						fullWidth
						rows={4}
						variant='outlined'
						label='Comment'
						multiline={true}
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					<Button
						style={{ marginTop: '10px' }}
						fullWidth
						disabled={!comment}
						variant='contained'
						onClick={handleClick}
					>
						Comment
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CommentSection;
