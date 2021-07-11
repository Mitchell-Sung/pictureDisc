// @flow
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPostsBySearch } from '../../actions/action.posts';
import Pagination from '../Pagination/Pagination';
import ChipInput from 'material-ui-chip-input';
import useStyles from './Home.styles';
import {
	Container,
	Grow,
	Grid,
	Paper,
	TextField,
	Button,
	AppBar,
} from '@material-ui/core';

// https://www.zerocho.com/category/HTML&DOM/post/5b3ae84fb3dabd001b53b9ab
const useQuery = () => {
	const query = new URLSearchParams(useLocation().search);
	return query;
};

const Home = () => {
	const classes = useStyles();
	const [currentId, setCurrentId] = useState(0);
	const dispatch = useDispatch();
	const query = useQuery();
	const history = useHistory();
	const page = query.get('page') || 1;
	const searchQuery = query.get('searchQuery');
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
							<Button onClick={searchPost} variant='contained' color='primary'>
								Search
							</Button>
						</AppBar>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
						{!searchQuery && !tags.length && (
							<Paper elevation={6} className={classes.pagination}>
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
