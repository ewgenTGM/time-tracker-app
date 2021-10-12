enum ActionTypes {
	SET_IS_INITIALIZED = 'APP/SET_IS_INITIALIZED',
	SET_IS_AUTHORIZED = 'APP/SET_IS_AUTHORIZED'
}

export const setIsInitializedAC = (isInitialized: boolean) => {
	return {
		type: ActionTypes.SET_IS_INITIALIZED as const,
		payload: {isInitialized}
	};
};

export const setIsAuthorizedAC = (isAuthorized: boolean) => {
	return {
		type: ActionTypes.SET_IS_AUTHORIZED as const,
		payload: {isAuthorized}
	};
};

export type AppActionType = ReturnType<typeof setIsAuthorizedAC> | ReturnType<typeof setIsInitializedAC>

export type AppStateType = {
	isAuthorized: boolean
	isInitialized: boolean
}

const appState: AppStateType = {
	isAuthorized: false,
	isInitialized: false
};
export const appReducer = (state = appState, action: AppActionType): AppStateType => {
	switch (action.type) {
		default:
			return state;
	}
};