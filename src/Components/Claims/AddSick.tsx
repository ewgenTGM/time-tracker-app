import React, {useState} from 'react';
import commonStyles from './CommonStyles.module.css'
import {useDispatch} from 'react-redux';
import {addUserClaimTC} from '../../Store/Reducers/userReducer';

type PropsType = {

};

export const AddSick: React.FC<PropsType> = props => {
	const dispatch = useDispatch();

	const [dateBegin, setDateBegin] = useState<string>('');
	const [dateEnd, setDateEnd] = useState<string>('');
	const [sickDays, setSickDays] = useState<boolean>(false);

	const submit = () => {
		dispatch(addUserClaimTC('Sick', {dateBegin, dateEnd, sickDays}));
	};

	return (
		<div className={commonStyles.form}>
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
			<span>SickDays</span>
			<input
				type="checkbox"
				checked={sickDays}
				onChange={e => setSickDays(e.currentTarget.checked)}/>
			<button
				className={commonStyles.btnSubmit}
				onClick={submit}>Отправить
			</button>
		</div>
	);
};