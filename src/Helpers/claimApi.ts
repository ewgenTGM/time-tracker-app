import axios from 'axios';

const instance = axios.create({baseURL: 'http://localhost:28888/api/claim', withCredentials: true});

export const claimApi = {
	getInProgressClaims() {
		return instance.get('all');
	},
	setClaimStatus(id: number, status: number) {
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
	getUsersClaim() {
		return instance.get('');
	}
};