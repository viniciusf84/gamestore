import React from 'react';

/** shared */
import { cartTotal } from '../../utils/shared';

export default function cart(props) {

	return (
		<section className="shopping-cart">
			{props.children}
			
			{!props.isEmpty && (
				<div className="calc">
					<p>subtotal: <strong>R$ {props.total.toFixed(2)}</strong></p>
					<p>frete: <strong>R$ {props.shipping }</strong></p>
					<p>total: <strong className="big">R$ {cartTotal(props.total, props.shipping).toFixed(2)}</strong></p>
					<button className="btn big blue">finalizar compra</button>
				</div>
			)}
		</section>
	);

}