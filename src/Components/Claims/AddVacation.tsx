import React, {useState} from 'react';
import commonStyles from './CommonStyles.module.css';
import {useDispatch} from 'react-redux';

type PropsType = {};

export const AddVacation: React.FC<PropsType> = props => {
	const dispatch = useDispatch();
	const submit = ()=>{

	}
	const [dateBegin, setDateBegin] = useState<string>('');
	const [dateEnd, setDateEnd] = useState<string>('');
	return (
		<div className={commonStyles.form}>
			Add Vacation
			<span>Выберите дату начала</span>
			<input
				className={commonStyles.dtp}
				type="date"
				value={dateBegin}
				onChange={(e) => setDateBegin(e.currentTarget.value)}/>
			<span>Выберите дату конца</span>
			<input
				className={commonStyles.dtp}
				type="date"
				value={dateEnd}
				onChange={(e) => setDateEnd(e.currentTarget.value)}/>
			<button className={commonStyles.btnSubmit}>Отправить</button>
		</div>
	);
};