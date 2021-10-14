import {AppDispatch} from '../Store';
import {authApi} from '../../Helpers/authApi';

export enum ActionTypes {
	SET_ERROR = 'REGISTER/SET_ERROR',
	SET_IS_LOADING = 'REGISTER/SET_IS_LOADING',
	SET_IS_REGISTRATION_SUCCESS = 'REGISTER/SET_IS_REGISTRATION_SUCCESS'
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

export const setIsRegistrationSuccessAC = (isRegisterSuccess: boolean) => {
	return {
		type: ActionTypes.SET_IS_REGISTRATION_SUCCESS as const,
		payload: {
			isRegisterSuccess
		}
	};
};

export const registerTC = (name: string, email: string, password: string) => async (dispatch: AppDispatch) => {
	dispatch(setIsLoadingAC(true));
	dispatch(setErrorAC(null));
	try {
		await authApi.register(name, email, password);
		dispatch(setIsRegistrationSuccessAC(true));
	} catch (e) {
		dispatch(setErrorAC('Any error'));
		dispatch(setIsRegistrationSuccessAC(false));
	} finally {
		dispatch(setIsLoadingAC(false));
	}

};

export type RegistrationActionType =
	ReturnType<typeof setErrorAC>
	| ReturnType<typeof setIsLoadingAC>
	| ReturnType<typeof setIsRegistrationSuccessAC>

export type RegisterStateType = {
	error: string | null
	isLoading: boolean
	isRegisterSuccess: boolean
}

const initialState: RegisterStateType = {
	error: null,
	isLoading: false,
	isRegisterSuccess: false
};

export const registerReducer = (state = initialState, action: RegistrationActionType): RegisterStateType => {
	switch (action.type) {
		case ActionTypes.SET_IS_REGISTRATION_SUCCESS:
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