import React from 'react';
import {AddNewClaimForm} from '../../Components/AddNewClaimForm';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../Components/Routes';

export const UserPage: React.FC = props => {
	const isAuthorized = useSelector<RootState, boolean>(state => state.appReducer.isAuthorized);
	if (!isAuthorized) {
		return <Redirect to={PATH.LOGIN}/>;
	}
	return (
		<div>
			<AddNewClaimForm/>
		</div>
	);
};