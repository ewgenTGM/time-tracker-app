import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentUserTC, setUsersTC, StatisticStateType} from '../../Store/Reducers/userStatisticReducer';
import {RootState} from '../../Store/Store';
import {RequestsContainer} from '../../Components/Requests/RequestsContainer';
import {AppStateType} from '../../Store/Reducers/appReducer';
import {Link, Redirect} from 'react-router-dom';
import {PATH} from '../../Components/Routes';

type PropsType = {};

export const UserStatisticPage: React.FC<PropsType> = props => {

	const appStatus = useSelector<RootState, AppStateType>(state => state.appReducer);
	const statisticStatus = useSelector<RootState, StatisticStateType>(state => state.userStatisticReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setUsersTC());
	}, []);
	if (appStatus.isInitialized && ( !appStatus.isAuthorized ) || appStatus.user?.userType === 0) {
		return <Redirect to={PATH.LOGIN}/>;
	}
	const switchUser = (email: string) => {
		const user = statisticStatus.users.find(u => u.email === email);
		if (user) {
			dispatch(setCurrentUserTC(user));
		}
	};

	const userRequests = <RequestsContainer requests={statisticStatus.userRequests}/>;

	const userSwitcher = (
		statisticStatus.users.length !== 0
			? <select
				onChange={e => switchUser(e.currentTarget.value)}
				value={statisticStatus.currentUser?.email}
				name="users"
				id="users">
				{statisticStatus.users.map(user => <option
					key={user.email}
					value={user.email}>{user.name}</option>)}
			</select>
			: <span>No users</span> );

	return (
		<div>
			<h2>Statistic page</h2>
			<div><Link to={PATH.MANAGER_PAGE}>To dashboard</Link></div>
			{userSwitcher}
			<span>{statisticStatus.currentUser?.email}</span>
			{!statisticStatus.isLoading ? userRequests : <span>Loading....</span>}
		</div> );
};