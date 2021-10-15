import React, {useEffect} from 'react';
import {Container} from '@mui/material';
import {Routes} from './Components/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './Store/Store';
import {appInitializeTC, AppStateType} from './Store/Reducers/appReducer';
import {LoginResponseType} from './Helpers/authApi';
import {AppBar} from './Components/AppBar/AppBar';

function App() {
	const isInitialized = useSelector<RootState, boolean>(state => state.appReducer.isInitialized);
	const user = useSelector<RootState, LoginResponseType | null>(state => state.appReducer.user);
	const dispatch = useDispatch();
	useEffect(() => {
		if (!isInitialized) {
			console.log('Call init thunk');
			dispatch(appInitializeTC());
		}
		return;
	});
	return (
		<div>
			<AppBar/>
			<Container>
				<Routes/>
			</Container>
		</div>
	);
}

export default App;
