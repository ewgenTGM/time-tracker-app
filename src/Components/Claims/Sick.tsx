import React from 'react';

type PropsType = {
	data: any
};

export const Sick: React.FC<PropsType> = props => {
	const dateBegin = new Date(props.data.dateBegin).toDateString();
	const dateEnd = new Date(props.data.dateEnd).toDateString();

	return (
		<>
			<div>
				<span>Начало: {dateBegin}</span>
			</div>
			<div>
				<span>Окончание: {dateEnd}</span>
			</div>
		</>
	);
};