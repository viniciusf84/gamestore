import React, { Component } from 'react';
import API from  './utils/api';
import Header from './components/Header/Header'
import Product from './components/Product/Product'

class App extends Component {

	state = {
		carregando: true,		
		produtos: 0,
		frete: 0,
		freteGratis: false,
		subtotal: 0,
		total: 0,
	}

	componentDidUpdate(prevProps, prevState) {

		if(prevState.produtos !== this.state.produtos) {
			if(this.state.total > 250) {
				this.setState({
			    	freteGratis: true
			  	})
			} else {
				this.setState({
			    	freteGratis: false
			  	});
			}

			this.setState({
				frete: this.state.produtos * 10
			})			
		}		

	}

	addToCart(e) {		
		this.setState((state) => {
			return { 
				total: Math.round((state.total + e) * 100) /100,
				produtos: state.produtos + 1								
			}
		})
	}

	getApiData() {
		const url = API;

		return url.map(product => {
			return (
				<Product
					id={`produto-${product.id}`}
					key={product.id}
					src={require(`./assets/games/${product.image}`)}
					alt={product.name}
					title={product.name}
					price={product.price}
					hover="adicionar ao carrinho"
					onClick={(e) => this.addToCart(product.price)}
				/>       
			)
		})
	}


	render() {
		return (
			<div id="App" className="app">
				
				<div className="container">					
	
					<main className="main">
						
						<Header size="h1" title="Games" />
						
						<section id="produtos" className="product-list">
							{this.getApiData()}
						</section>

						<aside>
							<Header size="h4" title="Carrinho" />
							<p>{this.state.total}</p>
							<div>R$ {this.state.freteGratis ? '0,00' : this.state.frete }</div>
							<span>{this.state.produtos}</span>
						</aside>

					</main>

				</div> 

			</div>			
		);
	}
}

export default App;
