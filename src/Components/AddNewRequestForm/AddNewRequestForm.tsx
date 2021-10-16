import React, {useState} from 'react';
import {AddVacation} from '../Requests/AddVacation';
import styles from './AddNewRequestForm.module.css';
import {AddSick} from '../Requests/AddSick';
import {AddTransfer} from '../Requests/AddTransfer';
import {AddWFH} from '../Requests/AddWFH';

export const AddNewRequestForm: React.FC = props => {
	const requestTypes = ['Vacation', 'Sick', 'Transfer', 'WFH'];
	const [currentOption, setCurrentOption] = useState(requestTypes[0]);

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
		<div className={styles.addNewRequest}>
			<h3>Здесь можно сделать заявку</h3>
			<hr/>
			<select
				className={styles.requestTypeSelect}
				value={currentOption}
				name="requestType"
				onChange={(e) => setCurrentOption(e.currentTarget.value)}>
				{requestTypes.map(option => <option
					value={option}
					key={option}>{option}</option>)}
			</select>
			{form()}
		</div>
	);
};