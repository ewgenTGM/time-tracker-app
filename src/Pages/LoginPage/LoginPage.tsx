import React from 'react';
import {LoginForm} from '../../Components/LoginForm';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../Components/Routes';
import {LoginResponseType} from '../../Helpers/authApi';

export const LoginPage: React.FC = props => {

	const isAuthorized = useSelector<RootState, boolean>(state => state.appReducer.isAuthorized);
	const user = useSelector<RootState, LoginResponseType | null>(state => state.appReducer.user);
	if (isAuthorized) {
		if (user)
			return user.userType == 0 ? <Redirect to={PATH.USER_PAGE}/> :
				<Redirect to={PATH.MANAGER_PAGE}/>;
	}

	return (
		<LoginForm/>
	);
};