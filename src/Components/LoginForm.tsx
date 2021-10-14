import React from 'react';
import {Button, Grid, TextField} from '@mui/material';
import {Link, Redirect} from 'react-router-dom';
import {authApi} from '../Helpers/authApi';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Store/Store';
import {AuthStateType, loginTC, logoutTC} from '../Store/Reducers/authReducer';
import {PATH} from './Routes';

export const LoginForm: React.FC = props => {
	console.log('LoginForm call');
	const dispatch = useDispatch();
	const authState = useSelector<RootState, AuthStateType>(state => state.authReducer);
	const [email, setEmail] = React.useState<string>('manager.cent@gmail.com');
	const [password, setPassword] = React.useState<string>('12345678');

	const login = () => {
		dispatch(loginTC(email, password));
	};
	const checkStatus = () => {
		authApi.me().then(res => console.log(res.data));
	};
	const logout = () => {
		dispatch(logoutTC());
	};
	const greenCircle = <div style={{borderRadius: '50%', backgroundColor: 'green', width: '15px', height: '15px'}}/>;
	const redCircle = <div style={{borderRadius: '50%', backgroundColor: 'red', width: '15px', height: '15px'}}/>;
	return (
		<>
			<Grid
				container
				justifyContent={'center'}>
				{authState.isAuthorized ? greenCircle : redCircle}
				{authState.isLoading ? <span>Loading.....</span> : null}
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
				<Button
					variant="outlined"
					onClick={checkStatus}>Статус</Button>
				<Button
					variant="outlined"
					onClick={logout}>Выход</Button>
			</Grid>
			<Grid container>
				<Link to={PATH.REGISTER}>Зарегистрироваться</Link>
			</Grid>
		</>
	);
};