import React, { useState, useEffect } from 'react';
import { fetchData } from './utils/api';
import Header from './components/Header/Header';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';
import Empty from './components/Cart/Empty';
import OrderBy from './components/OrderBy/OrderBy';

/** shared */
import {priceFormat} from './utils/shared';

/** Styles */
import './styles/App.scss';

export default function App() {

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [cart, setCart] = useState([]);
	const [sorted, setSorted] = useState(null)
	const [shipping, setShipping] = useState(0);
	const [freeShipping, setFreeShipping] = useState(false);
	const [total, setTotal] = useState(0);	

	const sortedData = data.sort((a, b) => (
		(a[sorted] < b[sorted]) ? -1 : (a[sorted] > b[sorted]) ? 1 : 0
	));	

	async function getApiData(url) {
		setIsLoading(true);

		const data = await url;

		try {
			setData(data);			
		} catch(err) {
			console.log(err);
		}
		
		setIsLoading(false);
	}

	function addToCart(e) {
		setTotal(total + e.price);
		setCount(count + 1);
		setCart([...cart, e]);		
	}

	function removeFromCart(e) {
		let array = [...cart];
		let index = array.indexOf(e)

		if (index !== -1) {
			array.splice(index, 1);

			setTotal(priceFormat(total - e.price));
			setCount(count -1);
			setCart(array);
		}
	}	

	function renderDataList(list, hoverText, func) {
		return list.map((product, index) => (			
			<Product
				key={index}
				id={product.id.toString()}
				src={require(`./assets/games/${product.image}`)}
				alt={product.name}
				title={product.name}
				price={product.price}
				hoverText={hoverText}
				onClick={e => func(product)}
			/>
		))
	}

	useEffect(() => {
		getApiData(fetchData());
	}, []);

	useEffect(() => {
		setFreeShipping(total > 250);						

		setShipping(count * 10);	
	}, [count]);

	useEffect(() => {	
				
		setData(sortedData);

	}, [sorted])

	return (
		<div id="App" className="app">

			<div className="container">

				<main className="main">

					<section id="count" className="product-list">

						<Header size="h1" title="Games">
							<OrderBy onChange={e => setSorted(e.target.value)}/>
						</Header>

						{isLoading ? (
							<p className="loading alignCenter">Carregando produtos</p>
						)	: (
							renderDataList(data, 'adicionar ao carrinho', addToCart)
						)}
					</section>

					<aside>
						<Cart
							total={total}
							shipping={freeShipping ? +0.00 : shipping}
							count={count}
							products={cart}
							isEmpty={count === 0}
						>

							<Header size="h4" title="Carrinho">
								{count > 0 &&
									<span className="count">({count} itens)</span>
								}
							</Header>

							<Empty isEmpty={count === 0} />

							{cart &&
							<div className="list">
								{renderDataList(cart, false, removeFromCart)}
							</div>
							}

						</Cart>
					</aside>

				</main>

			</div>

		</div>		
	)
}

