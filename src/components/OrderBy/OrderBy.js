import React from 'react';

export default function orderBy(props) {
	
	return (
		<select id="orderby" className="order-by" onChange={props.onChange}>
			<option value="">Ordenar por</option>
			<option value="score">Mais populares</option>
			<option value="price">Preço</option>
			<option value="name">Ordem Alfabética</option>
		</select>
	)
};