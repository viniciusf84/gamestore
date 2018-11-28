import React from 'react';

const product = (props) => {	
	return (
		<section id={props.id} className="product">
			<img key={props.key} src={props.src} alt={props.alt} />
	    	<h2>{props.title}</h2>
	    	<span className="price">R$ {props.price}</span>
		</section>
	)	
};

export default product;