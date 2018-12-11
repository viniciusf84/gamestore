import React from 'react';

const cart = (props) => {

    function cartTotal() {
        return parseFloat((props.total + props.shipping).toFixed(10));
    }

	return (
        <section className="shopping-cart">
            {props.children}
            {!props.isEmpty &&
            <div className="calc">
                <p>subtotal: <strong>R$ {props.total.toFixed(2)}</strong></p>
                <p>frete: <strong>R$ {props.shipping }</strong></p>
                <p>total: <strong className="big">R$ {cartTotal().toFixed(2)}</strong></p>
                <button className="btn big blue">finalizar compra</button>
            </div>
            }
        </section>
    );

}
export default cart;