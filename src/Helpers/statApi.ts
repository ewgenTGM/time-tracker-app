import axios from 'axios';

const instance = axios.create({baseURL: 'http://localhost:28888/api/stat', withCredentials: true});

export const statApi = {
	getStatsByEmail(email: string) {
		const route = `${email}`;
		return instance.get(route);
	},
	getStats(){
		return instance.get('');
	}
};
