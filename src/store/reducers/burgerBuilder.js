import * as actionTypes from '../actions/actionTypes';

const initialState = {
	ingredients: null,
	totalPrice: 100,
	//loading : false,   // when it is TRUE --> SPINNER and when it is FALSE --> ORDER SUMMARY
	error : false,
	building: false
};

const INGREDIENT_PRICES = {
	salad: 15.25,
	cheese: 25.54,
	bacon: 30.79,
	meat: 30.63
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
				building: true
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
				building: true
			};
			case actionTypes.SET_INGREDIENTS:
				return{
					...state,
					ingredients : action.ingredients,
					totalPrice: 100,
					error: false,
					building: false
				}
			case actionTypes.FETCH_INGREDIENTS_FAILED: 
			return{
				...state,
				error: true
			}
		default:
			return state;
	}

	
};

export default reducer;
