import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';
import {logoutTC} from '../../Store/Reducers/authReducer';
import {AppStateType} from '../../Store/Reducers/appReducer';
import styles from './AppBar.module.css'

type PropsType = {};

export const AppBar: React.FC<PropsType> = props => {
	const dispatch = useDispatch();
	const appStatus = useSelector<RootState, AppStateType>(state => state.appReducer);
	const logout = () => {
		dispatch(logoutTC());
	};
	const userInfo = (
		<div>
			<span>{appStatus.user && appStatus.user.name}</span>
		</div>
	);

	return (
		<header className={styles.header}>
			{appStatus.isAuthorized ? userInfo : null}
			{appStatus.isAuthorized ? <button onClick={logout}>Logout</button> : null}
		</header>
	);
};