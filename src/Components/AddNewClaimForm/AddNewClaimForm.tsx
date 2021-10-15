import React, {useState} from 'react';
import {AddVacation} from '../Claims/AddVacation';
import styles from './AddNewClaimForm.module.css';
import {AddSick} from '../Claims/AddSick';
import {AddTransfer} from '../Claims/AddTransfer';
import {AddWFH} from '../Claims/AddWFH';

export const AddNewClaimForm: React.FC = props => {
	const claimTypes = ['Vacation', 'Sick', 'Transfer', 'WFH'];
	const [currentOption, setCurrentOption] = useState(claimTypes[0]);

	const form = () => {
		switch (currentOption) {
			case 'Vacation':
				return <AddVacation/>;
			case 'Sick':
				return <AddSick/>;
			case 'Transfer':
				return <AddTransfer/>;
			case 'WFH':
				return <AddWFH/>;
		}
	};
	return (
		<div className={styles.addNewClaim}>
			<h3>Здесь можно сделать заявку</h3>
			<hr/>
			<select
				className={styles.claimTypeSelect}
				value={currentOption}
				name="claimType"
				onChange={(e) => setCurrentOption(e.currentTarget.value)}>
				{claimTypes.map(option => <option
					value={option}
					key={option}>{option}</option>)}
			</select>
			{form()}
		</div>
	);
};