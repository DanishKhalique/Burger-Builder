
import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/actions'
import { connect } from 'react-redux'




 class BurgerBuilder extends Component {
    state = {
        
        
       // purchasable : false, // this is linked to disabling the order button when order = 0
        purchasing: false,  // this is linked to the order summary pop up when Order button is clicked
        loading : false,   // when it is TRUE --> SPINNER and when it is FALSE --> ORDER SUMMARY
        error : false
    }


    componentDidMount(){
     //  console.log(this.props)
        // axios.get('https://react-burger-builder-39519.firebaseio.com/ingredients.json') //https://react-burger-builder-39519.firebaseio.com/ 
        // .then(res => {
        //     this.setState({ingredients: res.data})
        // }).catch(error => {
        //     this.setState({ error: true})
        // })
    }
    // {
    //     "rules": {
    //       ".read": "now < 1601749800000",  // 2020-10-4
    //       ".write": "now < 1601749800000",  // 2020-10-4
    //     }
    //   }

    updatePurchaseState = (ingredients) => {
      const order =   Object.keys(ingredients)
      .map((igkey) => { return  ingredients[igkey]})
      
       .reduce((sum , el) => { // will add all the ingredients (quantity)
        return sum + el; 
       }, 0)
       return order > 0 // This will return true or false
    }

    

    purchaseHandler = () => {
        this.setState({purchasing: true})
    };
    
    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    };
    /*********************************** QUERY PARAMS METHOD ***********************/
    // purchaseContinueHandler = () => {
    // const queryParams = [];
    // for( let i in this.state.ingredients) {
    //  //   console.log(encodeURIComponent(i)) // name of ingredient
    //  //   console.log(encodeURIComponent(this.state.ingredients[i])) // quantity of ingredient
     
    //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i])) // i is the key like in Object.keys eg:=>  
    //                                     //  ["bacon=2", "cheese=1", "meat=1", "salad=1"]
    //                                     // 0: "bacon=2"
    //                                     // 1: "cheese=1"
    //                                     // 2: "meat=1"
    //                                     // 3: "salad=1"
    //                                     // length: 4
    // }
    // //console.log(queryParams)
    // queryParams.push('price=' + this.state.price)
    // const queryString = queryParams.join('&'); // &bacon=1&cheese=1&meat=1&salad=1
       
    //    this.props.history.push({
    //         pathname: '/checkout',
    //         search: '?' + queryString}); // ?bacon=1&cheese=1&meat=1&salad=1
    // }
    /******************************* */

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }
    

    render() {

        const disabledInfo = {
            ...this.props.ings
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
            // {salad : true , meat : true ...}
        }

        let orderSummary = null;
        


        

        let burger = this.state.error ? <p>INGREDIENTS NOT FOUND</p> : <Spinner />
        

        if(this.props.ings){

         burger =   ( 
            <>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                added = {this.props.onIngredientAdded} 
                removed = {this.props.onIngredientRemoved} 
                disabled = {disabledInfo} 
                price = {this.props.price} 
                ordered = {this.purchaseHandler}
                purchasable = {this.updatePurchaseState(this.props.ings)}
                backdrop = {this.state.purchasing}   />
             </>
             
        );
        
        orderSummary = (
                <OrderSummary
                ingredients={this.props.ings}
                price = {this.props.price}
                purchaseCancelled ={this.purchaseCancelHandler} 
                purchaseContinue ={this.purchaseContinueHandler}
                />
        )
        }


        if(this.state.loading){
            orderSummary = <Spinner />
         }
 


        return (
           <>
            <Modal show ={this.state.purchasing}  modalClosed ={this.purchaseCancelHandler} >
               {orderSummary}
            </Modal>
           {burger}

           </>     
            
        
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}
    
const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios))
