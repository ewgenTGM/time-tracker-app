import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {registerReducer} from './Reducers/registerReducer';
import {authReducer} from './Reducers/authReducer';

const RootReducer = combineReducers({
	authReducer,
	registerReducer

});

export const store = createStore(RootReducer, applyMiddleware(thunk));
//@ts-ignore
window.store = store.getState();
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
