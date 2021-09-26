// @flow
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import useStyles from './Auth.styles';
import AuthInput from './Auth.input';
import AuthIcon from './Auth.icon';
import { signin, signup } from '../../actions/action.auth';
import GOOGLE_ID from '../../config/config.index';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
	Typography,
	Avatar,
	Button,
	Paper,
	Grid,
	Container,
} from '@material-ui/core';

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const Auth = () => {
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const [isSignup, setIsSignup] = useState(false);
	const [formData, setFormData] = useState(initialState);
	const dispatch = useDispatch();
	const history = useHistory();

	const handleShowPassword = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isSignup) {
			dispatch(signup(formData, history));
		} else {
			dispatch(signin(formData, history));
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const switchMode = () => {
		setIsSignup((prevIsSignup) => !prevIsSignup);
		handleShowPassword(false);
	};

	const googleSuccess = async (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;

		try {
			dispatch({ type: 'AUTH', data: { result, token } });
			history.pushState('/');
		} catch (error) {
			console.error(error);
		}
	};

	const googleError = () =>
		console.log('Google Sign In was unsuccessful. Try again later');

	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<Fragment>
								<AuthInput
									name='firstName'
									label='First Name'
									handleChange={handleChange}
									autoFocus
									half
								/>
								<AuthInput
									name='lastName'
									label='Last Name'
									handleChange={handleChange}
									half
								/>
							</Fragment>
						)}
						<AuthInput
							name='email'
							label='Email Address'
							handleChange={handleChange}
							type='email'
						/>
						<AuthInput
							name='password'
							label='Password'
							handleChange={handleChange}
							type={showPassword ? 'text' : 'password'}
							handleShowPassword={handleShowPassword}
						/>
						{isSignup && (
							<AuthInput
								name='confirmPassword'
								label='Repeat Password'
								handleChange={handleChange}
								type='password'
							/>
						)}
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
					>
						{isSignup ? 'Sign Up' : 'Sign In'}
					</Button>
					<GoogleLogin
						clientId={GOOGLE_ID}
						render={(renderProps) => (
							<Button
								className={classes.googleButton}
								color='primary'
								fullWidth
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								startIcon={<AuthIcon />}
								variant='contained'
							>
								Google Sign In
							</Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googleError}
						cookiePolicy='single_host_origin'
					/>

					<Grid container justify='flex-end'>
						<Grid item>
							<Button onClick={switchMode}>
								{isSignup
									? 'Already have an account? Sign In'
									: 'Do not have an account? Sign Up'}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
