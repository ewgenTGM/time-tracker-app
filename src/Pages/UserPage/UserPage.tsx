import React, {useEffect} from 'react';
import {AddNewRequestForm} from '../../Components/AddNewRequestForm/AddNewRequestForm';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../Components/Routes';
import {setUserRequestsTC, UserStateType} from '../../Store/Reducers/userReducer';
import {RequestsContainer} from '../../Components/Requests/RequestsContainer';

export const UserPage: React.FC = props => {
	const isAuthorized = useSelector<RootState, boolean>(state => state.appReducer.isAuthorized);
	const userStatus = useSelector<RootState, UserStateType>(state => state.userReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setUserRequestsTC());
	}, []);

	if (!isAuthorized) {
		return <Redirect to={PATH.LOGIN}/>;
	}

	return (
		<div>
			<RequestsContainer requests={userStatus.requests}/>
			<AddNewRequestForm/>
		</div>
	);
};