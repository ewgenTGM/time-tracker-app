import React, {useState} from 'react';
import commonStyles from './CommonStyles.module.css'
import {useDispatch} from 'react-redux';
import {addUserClaimTC} from '../../Store/Reducers/userReducer';
type PropsType = {};

export const AddTransfer: React.FC<PropsType> = props => {

	const dispatch = useDispatch();

	const [dayFrom, setDayFrom] = useState<string>('');
	const [dayTo, setDayTo] = useState<string>('');

	const submit = () => {
		dispatch(addUserClaimTC('Transfer', {dayFrom, dayTo}));
	};

	return (
		<div className={commonStyles.form}>
			<span>С какого числа</span>
			<input
				className={commonStyles.dtp}
				type="date"
				value={dayFrom}
				onChange={(e) => setDayFrom(e.currentTarget.value)}/>
			<span>На кокое число</span>
			<input
				className={commonStyles.dtp}
				type="date"
				value={dayTo}
				onChange={(e) => setDayTo(e.currentTarget.value)}/>
			<button
				className={commonStyles.btnSubmit}
				onClick={submit}>Отправить
			</button>
		</div>
	);
};