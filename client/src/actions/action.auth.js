// @flow
import { AUTH } from '../constants/action.types';
import { signIn, signUp } from '../api/api.index';

const signin = (formData, router) => async (dispatch) => {
	try {
		const { data } = await signIn(formData);
		dispatch({ type: AUTH, data });
		router.push('/');
	} catch (error) {
		console.error(error);
	}
};

const signup = (formData, router) => async (dispatch) => {
	try {
		const { data } = await signUp(formData);
		dispatch({ type: AUTH, data });
		router.push('/');
	} catch (error) {
		console.error(error);
	}
};

export { signin, signup };
