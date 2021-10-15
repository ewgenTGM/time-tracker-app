import React from 'react';
import {Claim} from './Claim';
//import styles from './ClaimsContainer.module.css';

type PropsType = {
	claims: Array<any>
};

export const ClaimsContainer: React.FC<PropsType> = props => {

	const inProgressClaims = props.claims && props.claims.filter(c => c.claimStatus === 2).map(claim => <Claim
		claim={claim}
		key={claim.id}
		forUser/>);
	const approvedClaims = props.claims && props.claims.filter(c => c.claimStatus === 0).map(claim => <Claim
		claim={claim}
		key={claim.id}
		forUser/>);
	const rejectedClaims = props.claims && props.claims.filter(c => c.claimStatus === 1).map(claim => <Claim
		claim={claim}
		key={claim.id}
		forUser/>);
	return (
		<div>
			<div style={{display: 'flex', flexWrap: 'wrap'}}>{inProgressClaims}</div>
			<hr/>
			<div style={{display: 'flex', flexWrap: 'wrap'}}>{approvedClaims}</div>
			<hr/>
			<div style={{display: 'flex', flexWrap: 'wrap'}}>{rejectedClaims}</div>
		</div>
	);
};