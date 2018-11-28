import React from 'react';

const product = (props) => {	
	return (
		<div id={props.id} className="product-box alignCenter" onClick={props.onClick}>
			<div className="image-wrapper">
				<img key={props.key} src={props.src} alt={props.alt} />
			</div>
			<div className="info">
	    		<h3>{props.title}</h3>
	    		<span className="price">R$ {props.price}</span>
	    	</div>
	    	<div className="add-me">{props.hover}</div>
		</div>
	)	
};

export default product;