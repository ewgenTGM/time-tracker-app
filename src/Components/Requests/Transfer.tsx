import React from 'react';

type PropsType = {
	data: any
};

export const Transfer: React.FC<PropsType> = props => {
	const dayFrom = new Date(props.data.dayFrom).toDateString();
	const dayTo = new Date(props.data.dayTo).toDateString();

	return (
		<>
			<div>
				<span>Перенос с: {dayFrom}</span>
			</div>
			<div>
				<span>Перенос на: {dayTo}</span>
			</div>
		</>
	);
};