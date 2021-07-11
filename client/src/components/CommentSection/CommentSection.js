import React, { Fragment, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/action.posts';

import useStyles from './CommentSection.styles';
import { Typography, TextField, Button } from '@material-ui/core';

const CommentSection = ({ post }) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const commentsRef = useRef();

	const [comment, setComment] = useState('');
	const [comments, setComments] = useState(post?.comments);

	const user = JSON.parse(localStorage.getItem('user'));

	const handleClick = async () => {
		const finalComment = `${user.result.name}: ${comment}`;
		const newComments = await dispatch(commentPost(finalComment, post._id));
		setComments(newComments);
		setComment('');
		// show what wrote a comment with user and comment.
		commentsRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<Fragment>
			<div className={classes.commentsOuterContainer}>
				<div className={classes.commentsInnerContainer}>
					<Typography gutterBottom variant='h6'>
						Comments
					</Typography>
					{comments.map((comment, index) => (
						<Typography key={index} gutterBottom variant='subtitle1'>
							{/* split only user name */}
							<storng>{comment.split(': ')[0]}</storng>
							{comment.split(':')[1]}
						</Typography>
					))}
					<div ref={commentsRef} />
				</div>
				{user?.result?.name && (
					<div className={classes.writeCommentArea}>
						<Typography gutterBottom variant='h6'>
							Write a Comment
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
						<Button
							className={classes.button}
							fullWidth
							disabled={!comment}
							variant='contained'
							color='primary'
							onClick={handleClick}
						>
							Comment
						</Button>
					</div>
				)}
			</div>
		</Fragment>
	);
};

export default CommentSection;
