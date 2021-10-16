import React from 'react';
import {Request} from './Request';
//import styles from './RequestsContainer.module.css';

type PropsType = {
	requests: Array<any>
};

export const RequestsContainer: React.FC<PropsType> = props => {

	const inProgressRequests = props.requests && props.requests.filter(c => c.requestStatus === 2).map(request => <Request
		request={request}
		key={request.id}
		forUser/>);
	const approvedRequests = props.requests && props.requests.filter(c => c.requestStatus === 0).map(request => <Request
		request={request}
		key={request.id}
		forUser/>);
	const rejectedRequests = props.requests && props.requests.filter(c => c.requestStatus === 1).map(request => <Request
		request={request}
		key={request.id}
		forUser/>);
	return (
		<div>
			<div style={{display: 'flex', flexWrap: 'wrap'}}>{inProgressRequests}</div>
			<hr/>
			<div style={{display: 'flex', flexWrap: 'wrap'}}>{approvedRequests}</div>
			<hr/>
			<div style={{display: 'flex', flexWrap: 'wrap'}}>{rejectedRequests}</div>
		</div>
	);
};