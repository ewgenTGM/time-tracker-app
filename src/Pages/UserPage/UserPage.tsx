import React, {useEffect} from 'react';
import {AddNewClaimForm} from '../../Components/AddNewClaimForm/AddNewClaimForm';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../Components/Routes';
import {setUserClaimsTC, UserStateType} from '../../Store/Reducers/userReducer';
import {ClaimsContainer} from '../../Components/Claims/ClaimsContainer';

export const UserPage: React.FC = props => {
	const isAuthorized = useSelector<RootState, boolean>(state => state.appReducer.isAuthorized);
	const userStatus = useSelector<RootState, UserStateType>(state => state.userReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setUserClaimsTC());
	}, []);

	if (!isAuthorized) {
		return <Redirect to={PATH.LOGIN}/>;
	}

	return (
		<div>
			<ClaimsContainer claims={userStatus.claims}/>
			<AddNewClaimForm/>
		</div>
	);
};