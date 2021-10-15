import React from 'react';
import styles from './Claim.module.css';
import {Vacation} from './Vacation';
import {Sick} from './Sick';
import {Transfer} from './Transfer';
import {useDispatch} from 'react-redux';
import {setClaimsStatusTC} from '../../Store/Reducers/managerReducer';

type PropsType = {
	claim: any,
	readonly?: boolean
};

export const Claim: React.FC<PropsType> = props => {
	const {discriminator, user, id, claimStatus, ...rest} = props.claim;
	const {readonly} = props;
	const dispatch = useDispatch();

	const approveClaim = () => {
		dispatch(setClaimsStatusTC(id, 0));
	};

	const rejectClaim = () => {
		dispatch(setClaimsStatusTC(id, 1));
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
		}
	};

	const buttons = readonly ? ( <div className={styles.btns}>
		<button onClick={approveClaim}>Approve</button>
		<button onClick={rejectClaim}>Reject</button>
	</div> ) : null;

	const status = ['Approved', 'Rejected', 'In progress'];

	return (
		<div className={styles.card}>
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
				{status[claimStatus]}
			</div>
			<div style={{fontSize: '14px', textAlign: 'left'}}>
				{info()}
			</div>
			{buttons}
		</div>
	);
};