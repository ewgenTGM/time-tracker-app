import React, {useState} from 'react';
import commonStyles from './CommonStyles.module.css'
import {addUserClaimTC} from '../../Store/Reducers/userReducer';
import {useDispatch} from 'react-redux';

type PropsType = {

};

export const AddWFH: React.FC<PropsType> = props => {
	const dispatch = useDispatch();
	const [date, setDate] = useState<string>('');
	const submit = () => {
		dispatch(addUserClaimTC('WFH', {date}));
	};
	return (
		<div className={commonStyles.form}>
			<span>Какого числа будешь работать из дома?</span>
			<input
				className={commonStyles.dtp}
				type="date"
				value={date}
				onChange={(e) => setDate(e.currentTarget.value)}/>
			<button
				className={commonStyles.btnSubmit}
				onClick={submit}>Отправить
			</button>
		</div>
	);
};