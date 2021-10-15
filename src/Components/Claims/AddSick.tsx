import React from 'react';
import commonStyles from './CommonStyles.module.css'

type PropsType = {

};

export const AddSick: React.FC<PropsType> = props => {
	return (
		<div className={commonStyles.form}>
			Add Sick Form
		</div>
	);
};