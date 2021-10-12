// @flow
import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination';
import { getPostsBySearch, getPosts } from '../../actions/action.posts';

import useStyles from './Home.styles';
import Container from '@material-ui/core/Container';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import ChipInput from 'material-ui-chip-input';

function useQuery() {
	const query = new URLSearchParams(useLocation().search);
	return query;
}

const Home = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const query = useQuery();
	const page = query.get('page') || 1;
	const searchQuery = query.get('searchQuery');

	const [currentId, setCurrentId] = useState(0);
	const [search, setSearch] = useState(' ');
	const [tags, setTags] = useState([]);

	const searchPost = () => {
		if (search.trim() || tags) {
			dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
			history.push(
				`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`
			);
		} else {
			history.push('/');
		}
	};

	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			searchPost();
		}
	};

	const handleAddChip = (tag) => setTags([...tags, tag]);

	const handleDeleteChip = (tagToDelete) =>
		setTags(tags.filter((tag) => tag !== tagToDelete));

	useEffect(() => {
		dispatch(getPosts());
	}, [currentId, dispatch]);

	return (
		<Grow in>
			<Container maxWidth='xl'>
				<Grid
					container
					justify='space-between'
					alignItems='stretch'
					spacing={3}
					className={classes.gridContainer}
				>
					<Grid item xs={12} sm={6} md={9}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppBar
							className={classes.appBarSearch}
							position='static'
							color='inherit'
						>
							<TextField
								name='search'
								variant='outlined'
								label='Search pictures'
								fullWidth
								onKeyPress={handleKeyPress}
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<ChipInput
								style={{ margin: '10px 0' }}
								value={tags}
								onAdd={(chip) => handleAddChip(chip)}
								onDelete={(chip) => handleDeleteChip(chip)}
								label='Search Tags'
								variant='outlined'
							/>
							<Button
								className={classes.searchButton}
								variant='contained'
								color='primary'
								onClick={searchPost}
							>
								Search
							</Button>
						</AppBar>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
						{!searchQuery && !tags.length && (
							<Paper className={classes.pagination} elevation={6}>
								<Pagination page={page} />
							</Paper>
						)}
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
