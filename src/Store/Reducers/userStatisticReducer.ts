import {AppDispatch} from '../Store';
import {userApi} from '../../Helpers/userApi';
import {LoginResponseType} from '../../Helpers/authApi';
import {requestApi} from '../../Helpers/requestApi';
import {ManagerActionTypes} from './managerReducer';
import {statApi} from '../../Helpers/statApi';

export enum UserStatisticActionTypes {
	SET_ERROR = 'STATISTIC/SET_ERROR',
	SET_IS_LOADING = 'STATISTIC/SET_IS_LOADING',
	SET_USERS = 'STATISTIC/SET_USERS',
	SET_CURRENT_USER = 'STATISTIC/SET_CURRENT_USER',
	SET_USER_REQUESTS = 'STATISTIC/SET_USER_REQUESTS',
	SET_USER_STATS = 'STATISTIC/SET_USER_STATS'
}

export const setUsersAC = (users: Array<LoginResponseType>) => {
	return {
		type: UserStatisticActionTypes.SET_USERS as const,
		payload: {
			users
		}
	};
};

export const setUserStatsAC = (userStats: any) => {
	return {
		type: UserStatisticActionTypes.SET_USER_STATS as const,
		payload: {
			userStats
		}
	};
};

export const setCurrentUserAC = (currentUser: LoginResponseType | null) => {
	return {
		type: UserStatisticActionTypes.SET_CURRENT_USER as const,
		payload: {
			currentUser
		}
	};
};

export const setUserRequestsAC = (userRequests: Array<any>) => {
	return {
		type: UserStatisticActionTypes.SET_USER_REQUESTS as const,
		payload: {
			userRequests
		}
	};
};

export const setErrorAC = (error: string | null) => {
	return {
		type: UserStatisticActionTypes.SET_ERROR as const,
		payload: {
			error
		}
	};
};

export const setIsLoadingAC = (isLoading: boolean) => {
	return {
		type: UserStatisticActionTypes.SET_IS_LOADING as const,
		payload: {
			isLoading
		}
	};
};

export type StatisticActionType =
	ReturnType<typeof setIsLoadingAC>
	| ReturnType<typeof setErrorAC>
	| ReturnType<typeof setCurrentUserAC>
	| ReturnType<typeof setUserRequestsAC>
	| ReturnType<typeof setUsersAC>
	| ReturnType<typeof setUserStatsAC>

export const setUsersTC = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(setIsLoadingAC(true));
		const usersResponse = await userApi.getAllUser();
		dispatch(setUsersAC(usersResponse.data));
		dispatch(setCurrentUserAC(usersResponse.data[0]));
		const response = await requestApi.getRequestsByEmail(usersResponse.data[0].email);
		dispatch(setUserRequestsAC(response.data));
	} catch (e) {
		setErrorAC('Any Error');
		dispatch(setCurrentUserAC(null));
	} finally {
		dispatch(setIsLoadingAC(false));
	}
};

export const setCurrentUserTC = (user: LoginResponseType) => async (dispatch: AppDispatch) => {
	try {
		dispatch(setIsLoadingAC(true));
		dispatch(setCurrentUserAC(user));
		const response = await requestApi.getRequestsByEmail(user.email);
		dispatch(setUserRequestsAC(response.data));
		const stats = await statApi.getStatsByEmail(user.email);
		dispatch(setUserStatsAC(stats.data));
	} catch (e) {
		setErrorAC('Any Error');
		dispatch(setCurrentUserAC(null));
	} finally {
		dispatch(setIsLoadingAC(false));
	}
};

export type StatisticStateType = {
	userRequests: Array<any>,
	isLoading: boolean,
	error: string | null,
	currentUser: LoginResponseType | null,
	users: Array<LoginResponseType>,
	userStats: any
}

const initialStata: StatisticStateType = {
	currentUser: null,
	users: [],
	isLoading: false,
	error: null,
	userRequests: [],
	userStats: {}
};

export const userStatisticReducer = (state = initialStata, action: StatisticActionType): StatisticStateType => {

	switch (action.type) {
		case UserStatisticActionTypes.SET_CURRENT_USER:
		case UserStatisticActionTypes.SET_ERROR:
		case UserStatisticActionTypes.SET_IS_LOADING:
		case UserStatisticActionTypes.SET_USER_REQUESTS:
		case UserStatisticActionTypes.SET_USERS:
		case UserStatisticActionTypes.SET_USER_STATS:
			return {...state, ...action.payload};
		default:
			return state;
	}

};