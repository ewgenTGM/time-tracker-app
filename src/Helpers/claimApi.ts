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
	addVacation(dateBegin: string, dateEnd: string, unpaided: boolean) {
		const route = `${unpaided ? 'unpaidedvacation' : 'vacation'}`;
		return instance.post(route, {dateBegin, dateEnd});
	}
};