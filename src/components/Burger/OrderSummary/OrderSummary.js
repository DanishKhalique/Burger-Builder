// This file is created to be exported to Modal.js
// Here we are creating how the OrderSummary will look like on the modal
import React from 'react'
import Button from '../../UI/Button/Button'


const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igkey => {
        return <li key={igkey}>
        <span style={{textTransform : 'capitalize' , fontWeight: 'bolder'}}>
        {igkey}</span> 
        : {props.ingredients[igkey]}
        </li>
        
    })
    return (
        <>
       
            <h3>Your Order</h3> 
            <p>A Delicious Burger With The Following Ingredients:</p>
            <ul>
            {ingredientSummary}
            </ul>
            <p><strong>Total Price : {props.price}</strong></p>
            <p>Continue to <strong>CHECKOUT</strong> ?</p>
            <Button btnType="Return" clicked={props.purchaseContinue}>PROCEED</Button>
            <Button btnType="Proceed" clicked={props.purchaseCancelled}>RETURN</Button>
            
      
        </>
    )
}

export default OrderSummary
