import React from 'react';
import styles from './Claim.module.css';
import {Vacation} from './Vacation';
import {Sick} from './Sick';
import {Transfer} from './Transfer';

type PropsType = {
	claim: any
};

export const Claim: React.FC<PropsType> = props => {
	const {discriminator, user, id, claimStatus, ...rest} = props.claim;
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

	const status = ["Approved", "Rejected", "In progress"];

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
			<div className={styles.btns}>
				<button>Approve</button>
				<button>Reject</button>
			</div>
		</div>
	);
};