import React from 'react';

export default function product(props) {
	
	return (
		<div id={props.id} className="product-box">
			
			<div className="image-wrapper">
				<img key={props.key} src={props.src} alt={props.alt} />
			</div>
			
			<div className="info">
				<h3>{props.title}</h3>
				<span className="price">R$ {props.price.toFixed(2)}</span>
			</div>
			
			<button className="action" onClick={props.onClick} >
				{props.hoverText}
			</button>
		</div>
	)
};