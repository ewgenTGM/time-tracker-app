import React from 'react';
import styles from './Request.module.css';
import {Vacation} from './Vacation';
import {Sick} from './Sick';
import {Transfer} from './Transfer';
import {useDispatch} from 'react-redux';
import {setRequestStatusTC} from '../../Store/Reducers/managerReducer';
import {WFH} from './WFH';

type PropsType = {
	request: any,
	forUser?: boolean
};

export const Request: React.FC<PropsType> = props => {
	const {discriminator, user, id, requestStatus, ...rest} = props.request;
	const {forUser} = props;
	const dispatch = useDispatch();

	const approveRequest = () => {
		dispatch(setRequestStatusTC(id, 0));
	};

	const rejectRequest = () => {
		dispatch(setRequestStatusTC(id, 1));
	};

	const info = () => {
		switch (discriminator) {
			case 'Sick':
				return <Sick data={rest}/>;
			case 'SickDays':
				return <Sick data={rest}/>;
			case 'Vacation':
				return <Vacation data={rest}/>;
			case 'UnpaidedVacation':
				return <Vacation data={rest}/>;
			case 'Transfer':
				return <Transfer data={rest}/>;
			case 'WorkFromHome':
				return <WFH data={rest}/>;
		}
	};

	const getColor = () => {
		switch (discriminator) {
			case 'Sick':
				return 'lightgreen';
			case 'SickDays':
				return 'lightsalmon';
			case 'Vacation':
				return 'lightpink';
			case 'UnpaidedVacation':
				return 'lightyellow';
			case 'Transfer':
				return 'lightskyblue';
			case 'WorkFromHome':
				return 'tomato';
			default:
				return 'white';
		}
	};

	const buttons = !forUser ? ( <div className={styles.btns}>
		<button onClick={approveRequest}>Approve</button>
		<button onClick={rejectRequest}>Reject</button>
	</div> ) : null;

	const status = ['Approved', 'Rejected', 'In progress'];
	return (
		<div
			className={styles.card}
			style={{backgroundColor: getColor()}}>
			<div className={styles.title}>
				{discriminator}
			</div>
			<div className={styles.user}>
				{user.name}
			</div>
			<div className={styles.email}>
				{user.email}
			</div>
			<div>
				{status[requestStatus]}
			</div>
			<div style={{fontSize: '14px', textAlign: 'left'}}>
				{info()}
			</div>
			{buttons}
		</div>
	);
};