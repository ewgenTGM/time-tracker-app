import React from 'react';
import {RegisterForm} from '../../Components/RegisterForm';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';
import {RegisterStateType} from '../../Store/Reducers/registerReducer';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../Components/Routes';

export const RegisterPage: React.FC = props => {
	const registerStatus = useSelector<RootState, RegisterStateType>(state => state.registerReducer);

	if (registerStatus.isRegisterSuccess) {
		return <Redirect to={PATH.LOGIN}/>;
	}
	return (
		<RegisterForm/>
	);
};