import React from 'react';
import cartIcon from '../../assets/svg/cart-icon.svg'

export default function emptyCart(props) {
	
	return (
		props.isEmpty && (
			<div className="empty">
				<img src={cartIcon} alt="cart icon" />
				<p>Até o momento,<br /> o seu carrinho está vazio</p>
			</div>
		)
	);

};