import {authApi, LoginResponseType} from '../../Helpers/authApi';
import {AppDispatch} from '../Store';

enum ActionTypes {
	SET_IS_INITIALIZED = 'APP/SET_IS_INITIALIZED',
	SET_IS_AUTHORIZED = 'APP/SET_IS_AUTHORIZED',
	SET_USER_DATA = 'APP/SET_USER_DATA',
	SET_IS_LOADING = 'APP/SET_IS_LOADING',
	SET_ERROR = 'APP/SET_ERROR'
}

export const setIsLoadingAC = (isLoading: boolean) => {
	return {
		type: ActionTypes.SET_IS_LOADING as const,
		payload: {isLoading}
	};
};

export const setErrorAC = (error: string | null) => {
	return {
		type: ActionTypes.SET_ERROR as const,
		payload: {error}
	};
};

export const setIsInitializedAC = (isInitialized: boolean) => {
	return {
		type: ActionTypes.SET_IS_INITIALIZED as const,
		payload: {isInitialized}
	};
};

export const setUserAC = (user: LoginResponseType | null) => {
	return {
		type: ActionTypes.SET_USER_DATA as const,
		payload: {user}
	};
};

export const appInitializeTC = () => async (dispatch: AppDispatch) => {
	dispatch(setIsLoadingAC(true));
	try {
		const res = await authApi.me().then(res => res.data);
		dispatch(setUserAC(res));
		dispatch(setIsAuthorizedAC(true))
	} catch (e) {
		dispatch(setUserAC(null));
		dispatch(setErrorAC("Something went wrong"))
	} finally {
		dispatch(setIsInitializedAC(true));
		dispatch(setIsLoadingAC(false));
	}
};

export const setIsAuthorizedAC = (isAuthorized: boolean) => {
	return {
		type: ActionTypes.SET_IS_AUTHORIZED as const,
		payload: {isAuthorized}
	};
};

export type AppActionType = ReturnType<typeof setIsAuthorizedAC>
	| ReturnType<typeof setIsInitializedAC>
	| ReturnType<typeof setUserAC>
	| ReturnType<typeof setIsLoadingAC>
	| ReturnType<typeof setErrorAC>

export type AppStateType = {
	isAuthorized: boolean
	isInitialized: boolean
	user: LoginResponseType | null
	error: string | null
	isLoading: boolean
}

const appState: AppStateType = {
	isAuthorized: false,
	isInitialized: false,
	user: null,
	error: null,
	isLoading: false
};
export const appReducer = (state = appState, action: AppActionType): AppStateType => {
	switch (action.type) {
		case ActionTypes.SET_IS_AUTHORIZED:
		case ActionTypes.SET_IS_INITIALIZED:
		case ActionTypes.SET_USER_DATA:
		case ActionTypes.SET_ERROR:
		case ActionTypes.SET_IS_LOADING:
			return {...state, ...action.payload};
		default:
			return state;
	}
};