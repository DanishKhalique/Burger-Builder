// ACTION CREATOR FOR BUILDING A BURGER
import axios from '../../axios-orders'
import * as actionTypes from './actionTypes'; 

export const addIngredient = (name) => {
    return{
        type: actionTypes.ADD_INGREDIENT, 
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return{
        type: actionTypes.REMOVE_INGREDIENT, 
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients

    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-burger-builder-39519.firebaseio.com/ingredients.json') //https://react-burger-builder-39519.firebaseio.com/ 
        .then(response => {
           dispatch(setIngredients(response.data))
        }).catch(error => {
            dispatch(fetchIngredientsFailed())
        })
    }
}