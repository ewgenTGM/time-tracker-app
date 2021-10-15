import {AppDispatch} from '../Store';
import {claimApi} from '../../Helpers/claimApi';

export enum UserActionTypes {
	SET_ERROR = 'USER/SET_ERROR',
	SET_IS_LOADING = 'USER/SET_IS_LOADING',
	SET_CLAIMS = 'USER/SET_IS_REGISTRATION_SUCCESS'
}

export const setErrorAC = (error: string | null) => {
	return {
		type: UserActionTypes.SET_ERROR as const,
		payload: {
			error
		}
	};
};

export const setIsLoadingAC = (isLoading: boolean) => {
	return {
		type: UserActionTypes.SET_IS_LOADING as const,
		payload: {
			isLoading
		}
	};
};

export const setClaimsAC = (claims: Array<any>) => {
	return {
		type: UserActionTypes.SET_CLAIMS as const,
		payload: {
			claims
		}
	};
};

export const addUserClaimTC = (claimType: string, payload: any) => async (dispatch: AppDispatch) => {
	try {
		dispatch(setErrorAC(null));
		dispatch(setIsLoadingAC(true));
		// Добавить логику для всех типов
		switch (claimType) {
			case 'Transfer':
				await claimApi.addTransfer(payload.dayFrom, payload.dayTo, payload.description);
				break;
			case 'Vacation':
				await claimApi.addVacation(payload.dateBegin, payload.dateEnd, payload.unpaided, payload.description);
				break;
			default:
				dispatch(setIsLoadingAC(true));
				return;
		}
		const response = await claimApi.getUsersClaim();
		dispatch(setClaimsAC(response.data));
	} catch (e) {
		dispatch(setErrorAC('Some Error'));
	} finally {
		dispatch(setIsLoadingAC(false));
	}
};

export const setUserClaimsTC = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(setErrorAC(null));
		dispatch(setIsLoadingAC(true));
		const response = await claimApi.getUsersClaim();
		dispatch(setClaimsAC(response.data));
	} catch (e) {
		dispatch(setErrorAC('Some Error'));
	} finally {
		dispatch(setIsLoadingAC(false));
	}

};

export type UserActionType =
	ReturnType<typeof setClaimsAC>
	| ReturnType<typeof setIsLoadingAC>
	| ReturnType<typeof setErrorAC>

export type UserStateType = {
	isLoading: boolean
	error: string | null
	claims: Array<any>
}

const initialState = {
	claims: [],
	isLoading: false,
	error: null
};

export const userReducer = (state = initialState, action: UserActionType): UserStateType => {
	switch (action.type) {
		case UserActionTypes.SET_IS_LOADING:
		case UserActionTypes.SET_CLAIMS:
		case UserActionTypes.SET_ERROR:
			return {
				...state, ...action.payload
			};
		default:
			return state;
	}
};