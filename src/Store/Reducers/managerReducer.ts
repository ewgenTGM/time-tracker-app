import {AppDispatch} from '../Store';
import {claimApi} from '../../Helpers/claimApi';

export enum ManagerActionTypes {
	SET_ERROR = 'MANAGER/SET_ERROR',
	SET_IS_LOADING = 'MANAGER/SET_IS_LOADING',
	SET_CLAIMS = 'REGISTER/SET_IS_REGISTRATION_SUCCESS'
}

export const setErrorAC = (error: string | null) => {
	return {
		type: ManagerActionTypes.SET_ERROR as const,
		payload: {
			error
		}
	};
};

export const setIsLoadingAC = (isLoading: boolean) => {
	return {
		type: ManagerActionTypes.SET_IS_LOADING as const,
		payload: {
			isLoading
		}
	};
};

export const setClaimsAC = (claims: Array<any>) => {
	return {
		type: ManagerActionTypes.SET_CLAIMS as const,
		payload: {
			claims
		}
	};
};

export const setClaimsTC = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(setErrorAC(null));
		dispatch(setIsLoadingAC(true));
		const response = await claimApi.getInProgressClaims();
		dispatch(setClaimsAC(response.data));
	} catch (e) {
		dispatch(setErrorAC('Some Error'));
	} finally {
		dispatch(setIsLoadingAC(false));
	}

};

export const setClaimsStatusTC = (id: number, status: number) => async (dispatch: AppDispatch) => {
	try {
		dispatch(setErrorAC(null));
		dispatch(setIsLoadingAC(true));
		await claimApi.setClaimStatus(id, status);
		const newClaims = await claimApi.getInProgressClaims();
		dispatch(setClaimsAC(newClaims.data));
	} catch (e) {
		dispatch(setErrorAC('Some Error'));
	} finally {
		dispatch(setIsLoadingAC(false));
	}

};

export type ManagerActionType =
	ReturnType<typeof setClaimsAC>
	| ReturnType<typeof setIsLoadingAC>
	| ReturnType<typeof setErrorAC>

export type ManagerStateType = {
	isLoading: boolean
	error: string | null
	claims: Array<any>
}

const initialState = {
	claims: [],
	isLoading: false,
	error: null

};

export const managerReducer = (state = initialState, action: ManagerActionType): ManagerStateType => {
	switch (action.type) {
		case ManagerActionTypes.SET_IS_LOADING:
		case ManagerActionTypes.SET_CLAIMS:
		case ManagerActionTypes.SET_ERROR:
			return {
				...state, ...action.payload
			};
		default:
			return state;
	}
};

