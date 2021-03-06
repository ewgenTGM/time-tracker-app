import axios, {AxiosPromise} from 'axios';

const instance = axios.create({baseURL: 'http://localhost:28888/api', withCredentials: true});

export const authApi = {
	me() {
		return instance.get<LoginResponseType>('/auth/me');
	},
	login(email: string, password: string):AxiosPromise<LoginResponseType> {
		return instance.post('/auth/login', {email, password});
	},
	logout() {
		return instance.delete('/auth/login');
	},
	register: (name: string, email: string, password: string):AxiosPromise<LoginResponseType> => {
		return instance.post('/auth/register', {name, email, password});
	}
};

export type LoginResponseType = {
	email: string
	name: string
	userType: number
}