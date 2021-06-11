// @flow
import { AUTH, LOGOUT } from '../constants/action.types';

const authReducer = (state = { authData: null }, action) => {
	console.log('### authReducer.js');
	switch (action.type) {
		case AUTH:
			localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
			return { ...state, authData: action?.data };
		case LOGOUT:
			localStorage.clear();
			return { ...state, authData: null };
		default:
			return state;
	}
};

export default authReducer;
