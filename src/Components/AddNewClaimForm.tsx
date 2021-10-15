import React, {useState} from 'react';
import {AddVacation} from './Claims/AddVacation';
import styles from './AddNewClaimForm.module.css';
import {AddSick} from './Claims/AddSick';
import {AddTransfer} from './Claims/AddTransfer';
import {AddWFH} from './Claims/AddWFH';

export const AddNewClaimForm: React.FC = props => {
	const claimTypes = ['Vacation', 'Sick', 'Transfer', 'Work from home'];
	const [currentOption, setCurrentOption] = useState(claimTypes[0]);

	const form = () => {
		switch (currentOption) {
			case 'Vacation':
				return <AddVacation/>;
			case 'Sick':
				return <AddSick/>;
			case 'Transfer':
				return <AddTransfer/>;
			case 'Work from home':
				return <AddWFH/>;
		}
	};
	return (
		<div className={styles.addNewClaim}>
			<h3>Здесь можно сделать заявку</h3>
			<select
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