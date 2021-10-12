import React from 'react';
import {Button, Grid, TextField} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Store/Store';
import {RegisterStateType, registerTC} from '../Store/Reducers/registerReducer';

export const RegisterForm: React.FC = props => {
	const dispatch = useDispatch();
	const registerState = useSelector<RootState, RegisterStateType>(state => state.registerReducer);
	const [email, setEmail] = React.useState<string>('manager.cent@gmail.com');
	const [name, setName] = React.useState<string>('AnyName');
	const [password, setPassword] = React.useState<string>('12345678');

	const register = () => {
		dispatch(registerTC(name, email, password));
	};

	return (
		<Grid
			container
			justifyContent={'center'}>
			<TextField
				id="name"
				label="Name"
				variant="outlined"
				value={name}
				onChange={(e) => setName(e.currentTarget.value)}
			/>
			<TextField
				id="email"
				label="Email"
				variant="outlined"
				value={email}
				onChange={(e) => setEmail(e.currentTarget.value)}
			/>
			<TextField
				id="password"
				label="Password"
				type="password"
				variant="outlined"
				value={password}
				onChange={(e) => setPassword(e.currentTarget.value)}
			/>
			<Button
				variant="outlined"
				onClick={register}>Зарегистрироваться</Button>
		</Grid>
	);
};