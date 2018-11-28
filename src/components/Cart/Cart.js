import React from 'react';

const cart = (props) => {
	return (
        <aside>
            <section className="shopping-cart">
                {props.children}
                <p>subtotal: <strong>R$ {props.total}</strong></p>
                <p>frete: <strong>R$ {props.shipping }</strong></p>
                <p>total: <strong>R$ {props.total + props.shipping}</strong></p>
                <button className="btn big blue">finalizar compra</button>
            </section>
        </aside>
    );

}
export default cart;