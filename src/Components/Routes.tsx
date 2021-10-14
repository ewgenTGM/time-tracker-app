import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {LoginPage} from '../Pages/LoginPage/LoginPage';
import {RegisterPage} from '../Pages/RegisterPage/RegisterPage';
import {UserPage} from '../Pages/UserPage/UserPage';
import {ManagerPage} from '../Pages/ManagerPage/ManagerPage';

export enum PATH {
	LOGIN = '/login',
	REGISTER = '/register',
	USER_PAGE = '/user',
	MANAGER_PAGE = '/manager'
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
			<Route
				path={PATH.MANAGER_PAGE}
				exact
				render={() => <ManagerPage/>}/>
		</Switch>

	);
};