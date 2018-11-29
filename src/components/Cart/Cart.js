import React from 'react';

const cart = (props) => {
	return (
        <aside>
            <section className="shopping-cart">
                {props.children}
                {!props.isEmpty &&
                <div className="calc">
                    <p>subtotal: <strong>R$ {props.total}</strong></p>
                    <p>frete: <strong>R$ {props.shipping }</strong></p>
                    <p>total: <strong className="big">R$ {props.total + props.shipping}</strong></p>
                    <button className="btn big blue">finalizar compra</button>
                </div>
                }
            </section>
        </aside>
    );

}
export default cart;