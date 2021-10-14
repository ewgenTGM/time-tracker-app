import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ManagerStateType, setClaimsTC} from '../../Store/Reducers/managerReducer';

import {RootState} from '../../Store/Store';
import {Claim} from '../../Components/Claims/Claim';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../Components/Routes';

export const ManagerPage: React.FC = props => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setClaimsTC());
	}, []);

	const managerStatus = useSelector<RootState, ManagerStateType>(state => state.managerReducer);
	const {claims, isLoading, error} = managerStatus;

	const claimsArr = claims.map(c => <Claim
		claim={c}
		key={c.id}/>);
	const isAuthorized = useSelector<RootState, boolean>(state => state.appReducer.isAuthorized);
	if (!isAuthorized) {
		return <Redirect to={PATH.LOGIN}/>;
	}
	return (
		<div>
			<h2>Manager page</h2>
			{isLoading ? <span>....Loading....</span> :
				<div style={{display: 'flex', flexWrap: 'wrap'}}>{claimsArr}</div>}
			{error ? <span style={{color: 'red'}}>{error}</span> : null}
		</div>
	);
};