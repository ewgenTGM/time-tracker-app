import {AppDispatch} from '../Store';
import {authApi} from '../../Helpers/authApi';
import {setIsAuthorizedAC, setUserAC} from './appReducer';

enum ActionTypes {
	SET_ERROR = 'AUTH/SET_ERROR',
	SET_IS_LOADING = 'AUTH/SET_IS_LOADING'
}

export const setErrorAC = (error: string | null) => {
	return {
		type: ActionTypes.SET_ERROR as const,
		payload: {
			error
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

export const loginTC = (email: string, password: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(setIsLoadingAC(true));
		const res = await authApi.login(email, password);
		dispatch(setUserAC(res.data));
		dispatch(setIsAuthorizedAC(true));

	} catch (e) {
		dispatch(setErrorAC('Any error'));
		dispatch(setIsAuthorizedAC(false));
	} finally {
		dispatch(setIsLoadingAC(false));
	}
};

export const logoutTC = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(setIsLoadingAC(true));
		await authApi.logout();
		dispatch(setUserAC(null));
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

export type UserType = {
	name: string,
	email: string,
	role: number
}

export type AuthStateType = {
	error: string | null
	isLoading: boolean
	user: UserType
}

const initialState: AuthStateType = {
	error: null,
	isLoading: false,
	user: {} as UserType
};

export const authReducer = (state = initialState, action: AuthActionType): AuthStateType => {
	switch (action.type) {
		case ActionTypes.SET_IS_LOADING:
		case ActionTypes.SET_ERROR: {
			return {
				...state, ...action.payload
			};
		}
		default:
			return state;
	}
};