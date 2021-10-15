import React from 'react';
import {Button, Grid, TextField} from '@mui/material';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Store/Store';
import {loginTC} from '../Store/Reducers/authReducer';
import {PATH} from './Routes';

export const LoginForm: React.FC = props => {
	const dispatch = useDispatch();
	const isLoading = useSelector<RootState, boolean>(state => state.authReducer.isLoading);
	const [email, setEmail] = React.useState<string>('manager.cent@gmail.com');
	const [password, setPassword] = React.useState<string>('12345678');

	const login = () => {
		dispatch(loginTC(email, password));
	};

	return (
		<>
			<Grid
				container
				justifyContent={'center'}>
				{isLoading ? <span>Loading.....</span> : null}
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
					onClick={login}>Войти</Button>
			</Grid>
			<Grid container>
				<Link to={PATH.REGISTER}>Зарегистрироваться</Link>
			</Grid>
		</>
	);
};