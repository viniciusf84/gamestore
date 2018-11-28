import React, { Component } from 'react';
import API from  './utils/api';
import PageHeader from './components/PageHeader/PageHeader'
import Product from './components/Product/Product'

class App extends Component {

	state = {
		isLoading: true,
		emptyCar: true,    
		products: 0,
		freight: 0,
		total: 0
	}

	componentDidUpdate(prevState) {

		if(prevState.total !== this.state.total) {
		  	this.setState({
		    	freight: 0
		  	})
		}

	}

	getApiData() {
		const url = API;

		return url.map(product => {
			return (
				<Product
					id={`produto-${product.id}`}
					key={product}
					src={require(`./assets/games/${product.image}`)}
					alt={product.name}
					title={product.name}
					price={product.price}
				/>       
			)
		})
	}

	render() {
		return (
			<div className="App">

				<PageHeader title="Games" />

				<main>
					<section id="produtos">
						{this.getApiData()}
					</section>
				</main>
			</div>
		);
	}
}

export default App;
