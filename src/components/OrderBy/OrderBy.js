import React from 'react';

const orderBy = (props) => {
	return (
		<select id="orderby" className="order-by" onChange={props.change}>
			<option value="">Ordenar por</option>
			<option value="score">Mais populares</option>
			<option value="price">Preço</option>
			<option value="name">Ordem Alfabética</option>
		</select>
	)
};

export default orderBy;