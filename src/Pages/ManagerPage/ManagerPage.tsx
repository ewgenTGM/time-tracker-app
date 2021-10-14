import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ManagerStateType, setClaimsTC} from '../../Store/Reducers/managerReducer';

import {RootState} from '../../Store/Store';
import {Vacation} from '../../Components/Claims/Vacation';
import {Claim} from '../../Components/Claims/Claim';

export const ManagerPage: React.FC = props => {
	console.log('ManagerPage call');
	const dispatch = useDispatch();

	useEffect(() => {
		console.log('ManagerPage useEffect');
		dispatch(setClaimsTC());
	}, []);

	const managerStatus = useSelector<RootState, ManagerStateType>(state => state.managerReducer);
	const {claims, isLoading, error} = managerStatus;

	const claimsArr = claims.map(c=><Claim claim={c}/>)

	return (
		<div>
			<h2>Manager page</h2>
			{isLoading ? <span>....Loading....</span> : <div style={{display: 'flex', flexWrap: 'wrap'}}>{claimsArr}</div>}
			{error ? <span style={{color: 'red'}}>{error}</span> : null}
		</div>
	);
};