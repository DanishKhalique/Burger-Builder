import React, { Component } from 'react';

//import classes from './Checkout.module.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'

class Checkout extends Component {
	
	componentWillMount () {
		//this.props.onInitPurchase()
	}


	/********************** QUERY PARAMS ************/
	// componentWillMount() {
	// 	const query = new URLSearchParams(this.props.location.search); //?bacon=1&cheese=1&meat=1&salad=1
	// 	const ingredients = {};
	// 	let price = 0;
	// 	for (let param of query.entries()) {
	// 		// ["bacon=2", "cheese=1", "meat=1", "salad=1"]
	// 		// 0: "bacon=2"
	// 		// 1: "cheese=1"
	// 		// 2: "meat=1"
	// 		// 3: "salad=1"
	// 		// length: 4
	// 	//	console.log(ingredients[param[0]]); // undefined but possibly name of food
	// 	//	console.log(param[1]); // quantity
		
	// 	if(param[0] === 'price'){
	// 		price= +param[1]
	// 	}else{
	// 		ingredients[param[0]] = +param[1]; // + used to convert it into a number
	// 		// {bacon: 2, cheese: 1, meat: 1, salad: 1}
	// 		// bacon: 2
	// 		// cheese: 1
	// 		// meat: 1
	// 		// salad: 1
	// 	}
			
	// 	}
	// 	// console.log(ingredients);
	// 	this.setState({ ingredients: ingredients , price : price});
	// }
	/*********************************************************** */

	checkoutCancelHandler = () => {
		this.props.history.goBack(); // this will simply go one page back the page as the name suggest
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data'); // amazon par order now click kara samajh
	};

	render() {
		let summary = <Redirect to = "/" />
		if(this.props.ings){
				const purchasedRedirect = this.props.purchased ? <Redirect to = "/" /> : null;
			summary=(
			<div>
			{purchasedRedirect}
			<CheckoutSummary
				ingredients={this.props.ings}
				checkoutCancel={this.checkoutCancelHandler}
				checkoutContinued={this.checkoutContinuedHandler} />

				<Route path={this.props.match.path + '/contact-data'} 
				 //render= {(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>)}
				 component={ContactData} />
				 </div>
			)
		}
		return summary
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased
	}
}


export default connect(mapStateToProps)(Checkout);
