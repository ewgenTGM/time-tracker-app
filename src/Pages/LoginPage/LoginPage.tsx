import React from 'react';
import {LoginForm} from '../../Components/LoginForm';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../Components/Routes';

export const LoginPage: React.FC = props => {

	console.log('LoginPage call');
	const isAuthorized = useSelector<RootState, boolean>(state => state.appReducer.isAuthorized);
	console.log(isAuthorized);
	if (isAuthorized) {
		return <Redirect to={PATH.USER_PAGE}/>;
	}

	return (
		<LoginForm/>
	);
};