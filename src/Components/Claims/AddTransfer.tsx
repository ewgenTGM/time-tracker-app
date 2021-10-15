import React from 'react';
import commonStyles from './CommonStyles.module.css'
type PropsType = {};

export const AddTransfer: React.FC<PropsType> = props => {
	return (
		<div className={commonStyles.form}>
			Add Transfer Form
		</div>
	);
};