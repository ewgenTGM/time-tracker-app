import {AppDispatch} from '../Store';
import {api} from '../../Helpers/api';

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

export const setIsLoading = (isLoading: boolean) => {
	return {
		type: ActionTypes.SET_IS_LOADING as const,
		payload: {
			isLoading
		}
	};
};

export const setIsRegistrationSuccess = (isRegisterSuccess: boolean) => {
	return {
		type: ActionTypes.SET_IS_REGISTRATION_SUCCESS as const,
		payload: {
			isRegisterSuccess
		}
	};
};

export const registerTC = (name: string, email: string, password: string) => async (dispatch: AppDispatch) => {
	dispatch(setIsLoading(true));
	dispatch(setErrorAC(null));
	try {
		await api.register(name, email, password);
		dispatch(setIsRegistrationSuccess(true));
	} catch (e) {
		dispatch(setErrorAC('Any error'));
		dispatch(setIsRegistrationSuccess(false));
	} finally {
		dispatch(setIsLoading(false));
	}

};

export type RegistrationActionType =
	ReturnType<typeof setErrorAC>
	| ReturnType<typeof setIsLoading>
	| ReturnType<typeof setIsRegistrationSuccess>

type StateType = {
	error: string | null
	isLoading: boolean
	isRegisterSuccess: boolean
}

const initialState: StateType = {
	error: null,
	isLoading: false,
	isRegisterSuccess: false
};

export const registerReducer = (state = initialState, action: RegistrationActionType): StateType => {
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