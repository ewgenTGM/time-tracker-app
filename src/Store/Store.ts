import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {registerReducer} from './Reducers/registerReducer';
import {authReducer} from './Reducers/authReducer';
import {appReducer} from './Reducers/appReducer';
import {managerReducer} from './Reducers/managerReducer';
import {userReducer} from './Reducers/userReducer';
import {userStatisticReducer} from './Reducers/userStatisticReducer';

const RootReducer = combineReducers({
	authReducer,
	registerReducer,
	appReducer,
	managerReducer,
	userReducer,
	userStatisticReducer
});

export const store = createStore(RootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
