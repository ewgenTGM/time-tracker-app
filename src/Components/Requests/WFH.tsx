import React from 'react';

type PropsType = {
	data: any
};

export const WFH: React.FC<PropsType> = props => {
	const date = new Date(props.data.date).toDateString();
	return (
		<div>
			<span>Дата {date}</span>
		</div>
	);
};