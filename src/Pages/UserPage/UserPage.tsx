import React, {useEffect} from 'react';
import {AddNewClaimForm} from '../../Components/AddNewClaimForm';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../Components/Routes';
import {setUserClaimsTC, UserStateType} from '../../Store/Reducers/userReducer';
import {Claim} from '../../Components/Claims/Claim';

export const UserPage: React.FC = props => {
	const isAuthorized = useSelector<RootState, boolean>(state => state.appReducer.isAuthorized);
	const userStatus = useSelector<RootState, UserStateType>(state => state.userReducer);

	const claims = userStatus.claims && userStatus.claims.map(claim => <Claim
		claim={claim}
		key={claim.id}
		forUser/>);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setUserClaimsTC());
	}, []);

	if (!isAuthorized) {
		return <Redirect to={PATH.LOGIN}/>;
	}

	return (
		<div>
			<div style={{display: 'flex', flexWrap: 'wrap'}}>{claims}</div>
			<AddNewClaimForm/>
		</div>
	);
};