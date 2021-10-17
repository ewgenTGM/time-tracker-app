import React, {ChangeEvent, useState} from 'react';
import {AddVacation} from '../Requests/AddVacation';
import styles from './AddNewRequestForm.module.css';
import {AddSick} from '../Requests/AddSick';
import {AddTransfer} from '../Requests/AddTransfer';
import {AddWFH} from '../Requests/AddWFH';
import {useSelector} from 'react-redux';
import {UserStateType} from '../../Store/Reducers/userReducer';
import {RootState} from '../../Store/Store';
import {Alert} from '@mui/material';

export const AddNewRequestForm: React.FC = props => {
	const requestTypes = ['Vacation', 'Sick', 'Transfer', 'WFH'];
	const [currentOption, setCurrentOption] = useState(requestTypes[0]);
	const {isLoading, error} = useSelector<RootState, UserStateType>(state => state.userReducer);

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

	const setCurrent = (e: ChangeEvent<HTMLSelectElement>) => {
		setCurrentOption(e.currentTarget.value);
	};

	const requestForm = form();

	const errorBar = error ?
		<Alert
			severity="error"
			sx={{width: '100%'}}>
			{error}
		</Alert> : null;

	return (
		<div className={styles.addNewRequest}>
			<h3>Здесь можно сделать заявку</h3>
			<hr/>
			{!isLoading
				? <><select
					className={styles.requestTypeSelect}
					value={currentOption}
					name="requestType"
					onChange={setCurrent}>
					{requestTypes.map(option => <option
						value={option}
						key={option}>{option}</option>)}
				</select>
					<div>{requestForm}</div>
				</>
				:
				<span>Loading.....</span>
			}
			{errorBar}
		</div>
	);
};