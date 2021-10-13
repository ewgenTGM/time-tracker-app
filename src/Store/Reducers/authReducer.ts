import {AppDispatch} from '../Store';
import {api} from '../../Helpers/api';
import {setIsAuthorizedAppAC} from './appReducer';

enum ActionTypes {
	SET_ERROR = 'AUTH/SET_ERROR',
	SET_IS_LOADING = 'AUTH/SET_IS_LOADING',
	SET_USER_DATA = 'AUTH/SET_USER_DATA',
	SET_IS_AUTHORIZED = 'AUTH/SET_IS_AUTHORIZED'
}

export const setErrorAC = (error: string | null) => {
	return {
		type: ActionTypes.SET_ERROR as const,
		payload: {
			error
		}
	};
};

export const setIsAuthorizedAC = (isAuthorized: boolean) => {
	return {
		type: ActionTypes.SET_IS_AUTHORIZED as const,
		payload: {
			isAuthorized
		}
	};
};

export const setIsLoadingAC = (isLoading: boolean) => {
	return {
		type: ActionTypes.SET_IS_LOADING as const,
		payload: {
			isLoading
		}
	};
};

export const setUserDataAC = (user: UserType) => {
	return {
		type: ActionTypes.SET_USER_DATA as const,
		payload: {
			user
		}
	};
};

export const loginTC = (email: string, password: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(setIsLoadingAC(true));
		const response = await api.login(email, password);
		dispatch(setUserDataAC({} as UserType));
		dispatch(setIsAuthorizedAC(true));
		dispatch(setIsAuthorizedAppAC(true));

	} catch (e) {
		dispatch(setErrorAC('Any error'));
		dispatch(setIsAuthorizedAC(false));
		dispatch(setIsAuthorizedAppAC(false));
	} finally {
		dispatch(setIsLoadingAC(false));
	}
};

export const logoutTC = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(setIsLoadingAC(true));
		await api.logout();
		dispatch(setUserDataAC({} as UserType));
		dispatch(setIsAuthorizedAC(false));
	} catch (e) {
		dispatch(setErrorAC('Any error'));
	} finally {
		dispatch(setIsLoadingAC(false));
	}
};

export type AuthActionType =
	ReturnType<typeof setErrorAC>
	| ReturnType<typeof setIsLoadingAC>
	| ReturnType<typeof setUserDataAC>
	| ReturnType<typeof setIsAuthorizedAC>

export type UserType = {
	name: string,
	email: string,
	role: number
}

export type AuthStateType = {
	error: string | null
	isLoading: boolean
	user: UserType
	isAuthorized: boolean
}

const initialState: AuthStateType = {
	error: null,
	isLoading: false,
	user: {} as UserType,
	isAuthorized: false
};

export const authReducer = (state = initialState, action: AuthActionType): AuthStateType => {
	switch (action.type) {
		case ActionTypes.SET_USER_DATA:
		case ActionTypes.SET_IS_LOADING:
		case ActionTypes.SET_IS_AUTHORIZED:
		case ActionTypes.SET_ERROR: {
			return {
				...state, ...action.payload
			};
		}

		default:
			return state;
	}
};