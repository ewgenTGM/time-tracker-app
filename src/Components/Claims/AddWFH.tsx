import React from 'react';
import commonStyles from './CommonStyles.module.css'
type PropsType = {

};

export const AddWFH: React.FC<PropsType> = props => {
	return (
		<div className={commonStyles.form}>
			WFH Form
		</div>
	);
};