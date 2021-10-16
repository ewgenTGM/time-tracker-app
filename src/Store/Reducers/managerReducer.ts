import {AppDispatch} from '../Store';
import {requestApi} from '../../Helpers/requestApi';

export enum ManagerActionTypes {
	SET_ERROR = 'MANAGER/SET_ERROR',
	SET_IS_LOADING = 'MANAGER/SET_IS_LOADING',
	SET_REQUESTS = 'MANAGER/SET_REQUESTS'
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

export const setRequestsAC = (requests: Array<any>) => {
	return {
		type: ManagerActionTypes.SET_REQUESTS as const,
		payload: {
			requests
		}
	};
};

export const setRequestsTC = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(setErrorAC(null));
		dispatch(setIsLoadingAC(true));
		const response = await requestApi.getInProgressRequests();
		dispatch(setRequestsAC(response.data));
	} catch (e) {
		dispatch(setErrorAC('Some Error'));
	} finally {
		dispatch(setIsLoadingAC(false));
	}

};

export const setRequestStatusTC = (id: number, status: number) => async (dispatch: AppDispatch) => {
	try {
		dispatch(setErrorAC(null));
		dispatch(setIsLoadingAC(true));
		await requestApi.setRequestStatus(id, status);
		const newClaims = await requestApi.getInProgressRequests();
		dispatch(setRequestsAC(newClaims.data));
	} catch (e) {
		dispatch(setErrorAC('Some Error'));
	} finally {
		dispatch(setIsLoadingAC(false));
	}

};

export type ManagerActionType =
	ReturnType<typeof setRequestsAC>
	| ReturnType<typeof setIsLoadingAC>
	| ReturnType<typeof setErrorAC>

export type ManagerStateType = {
	isLoading: boolean
	error: string | null
	requests: Array<any>
}

const initialState = {
	requests: [],
	isLoading: false,
	error: null

};

export const managerReducer = (state = initialState, action: ManagerActionType): ManagerStateType => {
	switch (action.type) {
		case ManagerActionTypes.SET_IS_LOADING:
		case ManagerActionTypes.SET_REQUESTS:
		case ManagerActionTypes.SET_ERROR:
			return {
				...state, ...action.payload
			};
		default:
			return state;
	}
};

