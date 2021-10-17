import {AppDispatch} from '../Store';
import {requestApi} from '../../Helpers/requestApi';
import {statApi} from '../../Helpers/statApi';

export enum UserActionTypes {
	SET_ERROR = 'USER/SET_ERROR',
	SET_IS_LOADING = 'USER/SET_IS_LOADING',
	SET_REQUESTS = 'USER/SET_REQUESTS',
	SET_STATS = 'USER/SET/SET_STATS'
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

export const setRequestsAC = (requests: Array<any>) => {
	return {
		type: UserActionTypes.SET_REQUESTS as const,
		payload: {
			requests
		}
	};
};

export const setUserStatsAC = (stats: any) => {
	return {
		type: UserActionTypes.SET_STATS as const,
		payload: {
			stats
		}
	};
};

export const addUserRequestTC = (requestType: string, payload: any) => async (dispatch: AppDispatch) => {
	try {
		dispatch(setErrorAC(null));
		dispatch(setIsLoadingAC(true));
		// Добавить логику для всех типов
		switch (requestType) {
			case 'Transfer':
				await requestApi.addTransfer(payload.dayFrom, payload.dayTo, payload.description);
				break;
			case 'Vacation':
				await requestApi.addVacation(payload.dateBegin, payload.dateEnd, payload.unpaided, payload.description);
				break;
			case 'Sick':
				await requestApi.addSick(payload.dateBegin, payload.dateEnd, payload.sickDays, payload.description, payload.description);
				break;
			case 'WFH':
				await requestApi.addWorkFromHome(payload.date);
				break;
			default:
				dispatch(setIsLoadingAC(false));
				return;
		}
		const response = await requestApi.getUsersRequest();
		dispatch(setRequestsAC(response.data));
	} catch (e: any) {
		dispatch(setErrorAC(e.response ? e.response.data.message : e.message));
	} finally {
		dispatch(setIsLoadingAC(false));
	}
};

export const setUserRequestsTC = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(setErrorAC(null));
		dispatch(setIsLoadingAC(true));
		const response = await requestApi.getUsersRequest();
		dispatch(setRequestsAC(response.data));
		const stats = await statApi.getStats();
		dispatch(setUserStatsAC(stats.data));
	} catch (e) {
		dispatch(setErrorAC('Some Error'));
	} finally {
		dispatch(setIsLoadingAC(false));
	}

};

export type UserActionType =
	ReturnType<typeof setRequestsAC>
	| ReturnType<typeof setIsLoadingAC>
	| ReturnType<typeof setErrorAC>
	| ReturnType<typeof setUserStatsAC>

export type UserStateType = {
	isLoading: boolean
	error: string | null
	requests: Array<any>
	stats: any | null
}

const initialState = {
	requests: [],
	isLoading: false,
	error: null,
	stats: null
};

export const userReducer = (state = initialState, action: UserActionType): UserStateType => {
	switch (action.type) {
		case UserActionTypes.SET_IS_LOADING:
		case UserActionTypes.SET_REQUESTS:
		case UserActionTypes.SET_ERROR:
		case UserActionTypes.SET_STATS:
			return {
				...state, ...action.payload
			};
		default:
			return state;
	}
};