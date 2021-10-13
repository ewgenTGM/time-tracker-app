import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {LoginPage} from '../Pages/LoginPage/LoginPage';
import {RegisterPage} from '../Pages/RegisterPage/RegisterPage';
import {UserPage} from '../Pages/UserPage/UserPage';

export enum PATH {
	LOGIN = '/login',
	REGISTER = '/register',
	USER_PAGE='/userPage'
}

export const Routes: React.VFC = () => {

	return (

		<Switch>
			<Route
				path={'/'}
				exact
				render={() => <LoginPage/>}
			/>
			<Route
				path={PATH.LOGIN}
				exact
				render={() => <LoginPage/>}/>
			<Route
				path={PATH.REGISTER}
				exact
				render={() => <RegisterPage/>}/>
			<Route
				path={PATH.USER_PAGE}
				exact
				render={() => <UserPage/>}/>
		</Switch>

	);
};