// ACTION CREATOR FOR SUBMITTING AN ORDER
import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderID: id,
		orderData: orderData
	};
};

export const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	};
};

export const purchaseBurger = (orderData) => {
	return (dispatch) => {
		dispatch(purchaseBurgerStart());
		axios
			.post('/orders.json', orderData) // .json is required for firebase
			.then((response) => {
				console.log(`purchaseBurgerSuccess`, response.data);
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
			})
			.catch((error) => {
				dispatch(purchaseBurgerFail(error)); // even if unsucessful or error appears we should stop Spinner and Close the MODAL
			});
	};
};
export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	};
};

export const fetchOrdersSuccess = (orders) => {
	return{
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders : orders
	}
}

export const fetchOrderFail = (error) => {
	return{
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error
	}
}
export const fetchOrdersStart = () => {
	return{
		type: actionTypes.FETCH_ORDERS_START,
		
	}
}


export const fetchOrder = () => {
	return dispatch => {
		dispatch(fetchOrdersStart())
		axios
			.get('./orders.json')
			.then((res) => {
				const fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({
						...res.data[key],
						id: key
					});
				}
				dispatch(fetchOrdersSuccess(fetchedOrders))
				
			})
			.catch((err) => {
				dispatch(fetchOrderFail(err))
			});
	}
}
