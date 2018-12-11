import React, { Component } from 'react';
import { fetchData } from './utils/api';
import Header from './components/Header/Header';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';
import Empty from './components/Cart/Empty';
import OrderBy from './components/OrderBy/OrderBy';

/** Styles **/
import './styles/App.scss';

class App extends Component {

	state = {
		loading: true,
		data: [],
		sort: '',
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
				total: this.priceFormat(state.total + e.price),
				count: state.count + 1,
				cart: state.cart.concat(e)
			}
		})
	}

	removeFromCart(e) {
		let array = [...this.state.cart];
		let index = array.indexOf(e)

		if (index !== -1) {
			array.splice(index, 1);

			this.setState((state) => {
				return {
					total: this.priceFormat(state.total - e.price),
					count: state.count - 1,
					cart: array
				}
			})
		}
	}

	priceFormat(x) {
		let num = Number.parseFloat(x);
		num = +num.toFixed(2);

		return num;
	}

	renderListData(url) {
		return url.map((product, index)=> {
			return (
				<Product
					key={index}
					id={product.id.toString()}
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
		return url.map((product, index) => {
			return (
				<Product
					key={index}
					id={product.id.toString()}
					src={require(`./assets/games/${product.image}`)}
					alt={product.name}
					title={product.name}
					price={product.price}
					onClick={e => this.removeFromCart(product)}
				/>
			)
		})
	}

	sortItems(parameter) {
		const array = this.state.data.sort((a, b) => {
			if(a[parameter] < b[parameter]) { return -1; }
			if(a[parameter] > b[parameter]) { return 1; }
			return 0;
			}
		);

		this.setState((state) => {
			return { data: array  }
		})
	}


	render() {

		const add = "adicionar ao carrinho";
		const remove = "x";

		return (
			<div id="App" className="app">

				<div className="container">

					<main className="main">

						<section id="count" className="product-list">

							<Header size="h1" title="Games">
								<OrderBy  change={ e => this.sortItems(e.target.value)}/>
							</Header>

							{this.state.loading ?
							<p className="loading alignCenter">Carregando produtos</p>
							:
							this.renderListData(this.state.data)}
						</section>

						<aside>
							<Cart
								total={this.state.total}
								shipping={this.state.freeShipping ? +0.00 : this.state.shipping}
								count={this.state.count}
								products={this.state.cart}
								isEmpty={this.state.count === 0}
							>
								<Header size="h4" title="Carrinho">
									{this.state.count > 0 &&
										<span className="count">({this.state.count} itens)</span>
									}
								</Header>


								<Empty isEmpty={this.state.count === 0} />

								{this.state.cart &&
								<div className="list">
									{this.renderCartData(this.state.cart, remove, false)}
								</div>
								}

							</Cart>
						</aside>

					</main>

				</div>

			</div>
		);
	}
}

export default App;
