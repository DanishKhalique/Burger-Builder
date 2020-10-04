import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

export class App extends Component {
	render() {
		return (
			<div>
			<BrowserRouter>
				<Layout>
				<Switch>
					<Route path="/checkout" component={Checkout} />
					<Route path="/"  component={BurgerBuilder} />
				</Switch>
				</Layout>
			</BrowserRouter>
			</div>
		);
	}
}

export default App;
