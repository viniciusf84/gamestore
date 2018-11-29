import React, { Fragment } from 'react';
import cartIcon from '../../assets/svg/cart-icon.svg'

const emptyCart = (props) => {
	return (
        <Fragment>
            {props.isEmpty &&
            <div className="empty">
                <img src={cartIcon} />
                <p>Até o momento,<br /> o seu carrinho está vazio</p>
            </div>
            }
        </Fragment>
    );

}
export default emptyCart;