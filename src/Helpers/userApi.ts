import axios from 'axios';
import {LoginResponseType} from './authApi';

const instance = axios.create({baseURL: 'http://localhost:28888/api/user', withCredentials: true});

export const userApi = {
	getAllUser(){
		return instance.get<Array<LoginResponseType>>('');
	}
}