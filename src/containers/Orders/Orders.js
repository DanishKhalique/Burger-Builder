import React, { Component } from 'react';
import Order from '../../components/Order/CheckoutSummary/Order';
import classes from './Orders.module.css';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
export class Orders extends Component {
	componentDidMount() {
		this.props.onFetchedOrders(this.props.token, this.props.userId);

		// axios
		// 	.get('./orders.json')
		// 	.then((res) => {
		// 		const fetchedOrders = [];
		// 		for (let key in res.data) {
		// 			fetchedOrders.push({
		// 				...res.data[key],
		// 				id: key
		// 			});
		// 		}
		// 		this.setState({ loading: false, orders: fetchedOrders });
		// 	})
		// 	.catch((err) => {
		// 		this.setState({ loading: false });
		// 	});
	}
	render() {
		let orders = <Spinner />;
		if (!this.props.loading) {
			orders = (
				<div className={classes.Orders}>
					{this.props.orders.map((order) => (
						<Order key={order.id} ingredients={order.ingredients} price={+order.price} />
					))}
				</div>
			);
		}
		return orders;
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userId : state.auth.userId
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchedOrders: (token, userId) => dispatch(actions.fetchOrder(token, userId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
