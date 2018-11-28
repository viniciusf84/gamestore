import React, { Component } from 'react';
import { fetchData } from './utils/api';
import Header from './components/Header/Header';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';

/** Styles **/
import './styles/App.scss';

class App extends Component {

	state = {
		cartId: 1,
		loading: true,
		data: [],
		count: 0,
		cart: [],
		shipping: 0,
		freeShipping: false,
		subtotal: 0,
		total: 0,
	}

	componentDidMount() {
		this.getApiData(fetchData());
	}

	componentDidUpdate(prevProps, prevState) {

		if (prevState.count !== this.state.count) {
			if (this.state.total > 250) {
				this.setState({
					freeShipping: true
				})
			} else {
				this.setState({
					freeShipping: false
				});
			}

			this.setState({
				shipping: this.state.count * 10
			})
		}

	}

	getApiData = async (url) => {
		this.setState({
			loading: true
		});

		const data = await url;

		this.setState({
			data,
			loading: false
		})
	}

	addToCart(e) {
		this.setState((state) => {
			return {
				cartId: state.cartId + 1,
				total: Math.round((state.total + e.price) * 100) / 100,
				count: state.count + 1,
				cart: state.cart.concat(e)
			}
		})
	}

	removeFromCart(e) {
		this.setState((state) => {
			return {
				total: Math.round((state.total - e.price) * 100) / 100,
				count: state.count - 1,
				cart: this.state.cart.filter(element => e.cartId !== element.cartId)
			}
		})
	}

	renderListData(url) {
		return url.map(product => {
			return (
				<Product
					id={`produto-${this.state.cartId}`}
					key={this.state.cartId}
					src={require(`./assets/games/${product.image}`)}
					alt={product.name}
					title={product.name}
					price={product.price}
					hoverText="adicionar ao carrinho"
					onClick={e => this.addToCart(product)}
				/>
			)
		})
	}

	renderCartData(url) {
		return url.map(product => {
			return (
				<Product
					id={`produto-${this.state.cartId}`}
					key={this.state.cartId}
					src={require(`./assets/games/${product.image}`)}
					alt={product.name}
					title={product.name}
					price={product.price}
					hoverText="x"
					onClick={e => this.removeFromCart(product)}
				/>
			)
		})
	}


	render() {

		const add = "adicionar ao carrinho";
		const remove = "x";

		return (
			<div id="App" className="app">

				<div className="container">

					<main className="main">

						<Header size="h1" title="Games" />

						<section id="count" className="product-list">
							{this.renderListData(this.state.data)}
						</section>

						<Cart
							total={this.state.total}
							shipping={this.state.freeShipping ? +0.00 : this.state.shipping}
							count={this.state.count}
							products={this.state.cart}
						>
							<Header size="h4" title="Carrinho">
								{this.state.count > 0 &&
									<span>({this.state.count} itens)</span>
								}
							</Header>

							{this.state.cart &&
								this.renderCartData(this.state.cart, remove, false)}
						</Cart>

					</main>

				</div>

			</div>
		);
	}
}

export default App;
