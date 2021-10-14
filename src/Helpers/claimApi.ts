import axios from 'axios';

const instance = axios.create({baseURL: 'http://localhost:28888/api/claim', withCredentials: true});

export const claimApi = {
  getInProgressClaims: ()=>{
	  return instance.get('all');
  }
}