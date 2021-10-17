import axios from 'axios';

const instance = axios.create({baseURL: 'http://localhost:28888/api/request', withCredentials: true});

export const requestApi = {
	getInProgressRequests() {
		return instance.get('all');
	},
	setRequestStatus(id: number, status: number) {
		const route = `${status === 0 ? 'approve' : 'reject'}/${id}`;
		return instance.get(route);
	},
	addVacation(dateBegin: string, dateEnd: string, unpaided: boolean, description?: string) {
		const route = `add/${unpaided ? 'unpaidedvacation' : 'vacation'}`;
		return instance.post(route, {dateBegin, dateEnd, description});
	},
	addSick(dateBegin: string, dateEnd: string, sickDays: boolean, docNumber?: string, description?: string) {
		const route = `add/${sickDays ? 'sickdays' : 'sick'}`;
		return instance.post(route, {dateBegin, dateEnd, docNumber, description});
	},
	addTransfer(dayFrom: string, dayTo: string, description?: string) {
		const route = `add/transfer`;
		return instance.post(route, {dayFrom, dayTo, description});
	},
	addWorkFromHome(date: string) {
		const route = `add/wfh`;
		return instance.post(route, {date});
	},
	getUsersRequest() {
		return instance.get('');
	},
	getRequestsByEmail(email: string) {
		const route = `user/${email}`;
		return instance.get(route);
	}

};