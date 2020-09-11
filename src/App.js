import React, { useState, useEffect, useCallback } from 'react';
import api from './utils/api';
import Header from './components/Header/Header';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';
import Empty from './components/Cart/Empty';
import OrderBy from './components/OrderBy/OrderBy';

/** shared */
import { priceFormat } from './utils/shared';

/** Styles */
import './styles/App.scss';

export default function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [cart, setCart] = useState([]);
	const [sorted, setSorted] = useState(null);
	const [shipping, setShipping] = useState(0);
	const [freeShipping, setFreeShipping] = useState(false);
	const [total, setTotal] = useState(0);

	const sortedData = useCallback(
		data.sort(
			(a, b) => (a[sorted] < b[sorted] ? -1 : a[sorted] > b[sorted] ? 1 : 0),
		),
		[data],
	);

	const addToCart = useCallback(
		(e) => {
			setTotal(total + e.price);
			setCount(count + 1);
			setCart([...cart, e]);
		},
		[total, count],
	);

	const removeFromCart = useCallback(
		(e) => {
			let array = [...cart];
			let index = array.indexOf(e);

			if (index !== -1) {
				array.splice(index, 1);

				setTotal(priceFormat(total - e.price));
				setCount(count - 1);
				setCart(array);
			}
		},
		[total, count],
	);

	const renderDataList = useCallback((list, hoverText, func) => {
		return list.map((item, index) => (
			<Product
				key={index}
				id={item.id.toString()}
				src={require(`./assets/games/${item.image}`)}
				alt={item.name}
				title={item.name}
				price={item.price}
				hoverText={hoverText}
				onClick={(e) => func(item)}
			/>
		));
	}, []);

	useEffect(() => {
		async function getApiData(url) {
			setIsLoading(true);

			try {
				const response = await new Promise((resolve) =>
					setTimeout(() => resolve(url), 2000),
				);
				setData(response);
			} catch (err) {
				console.log(err);
			}

			setIsLoading(false);
		}

		getApiData(api);
	}, []);

	useEffect(
		() => {
			setFreeShipping(total > 250);

			setShipping(count * 10);
		},
		[count],
	);

	useEffect(
		() => {
			setData(sortedData);
		},
		[sorted],
	);

	return (
		<div id="App" className="app">
			<div className="container">
				<main className="main">
					<section id="count" className="product-list">
						<Header size="h1" title="Games">
							<OrderBy onChange={(e) => setSorted(e.target.value)} />
						</Header>

						{isLoading ? (
							<p className="loading alignCenter">Carregando produtos</p>
						) : (
							data && renderDataList(data, 'adicionar ao carrinho', addToCart)
						)}
					</section>

					<aside>
						<Cart
							total={total}
							shipping={freeShipping ? +0.0 : shipping}
							count={count}
							products={cart}
							isEmpty={count === 0}
						>
							<Header size="h4" title="Carrinho">
								{count > 0 && <span className="count">({count} itens)</span>}
							</Header>

							<Empty isEmpty={count === 0} />

							{cart && (
								<div className="list">
									{renderDataList(cart, false, removeFromCart)}
								</div>
							)}
						</Cart>
					</aside>
				</main>
			</div>
		</div>
	);
}
