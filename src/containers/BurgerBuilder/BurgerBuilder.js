
import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad : 15.25,
    cheese : 25.54,
    bacon : 30.79,
    meat : 30.63
}


 class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        price  : 100,
        purchasable : false, // this is linked to disabling the order button when order = 0
        purchasing: false,  // this is linked to the order summary pop up when Order button is clicked
        loading : false,   // when it is TRUE --> SPINNER and when it is FALSE --> ORDER SUMMARY
        error : false
    }


    componentDidMount(){
       console.log(this.props)
        axios.get('https://react-burger-builder-39519.firebaseio.com/ingredients.json') //https://react-burger-builder-39519.firebaseio.com/
        .then(res => {
            this.setState({ingredients: res.data})
        }).catch(error => {
            this.setState({error: true})
        })
    }


    updatePurchaseState = (ingredients) => {
      const order =   Object.keys(ingredients)
      .map((igkey) => { return  ingredients[igkey]})
      
       .reduce((sum , el) => { // will add all the ingredients (quantity)
        return sum + el; 
       }, 0)
       this.setState({purchasable: order > 0}) // This will return true or false
    }

    addItems = (type) => {
        const oldState = this.state.ingredients[type]
        const add = oldState + 1;
        const updatedIngredient = {...this.state.ingredients}
        updatedIngredient[type] = add;
        

 
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.price
        const newPrice = oldPrice + priceAddition

        this.setState({price: newPrice , ingredients: updatedIngredient})
        this.updatePurchaseState(updatedIngredient)

    };

    removeItems = (type) => {
        const oldState = this.state.ingredients[type]
        if(oldState <= 0){
            return;      // ******  SEXY TRICK ******
        }
        const remove = oldState - 1;
        const updatedIngredient = {...this.state.ingredients}
        updatedIngredient[type] = remove;
      
 
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.price
        const newPrice = oldPrice - priceAddition

        this.setState({price: newPrice , ingredients: updatedIngredient})
        this.updatePurchaseState(updatedIngredient)

    };

    purchaseHandler = () => {
        this.setState({purchasing: true})
    };
    
    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    };

    purchaseContinueHandler = () => {
      // this.setState({loading : true}) // on clicking 
      //  alert('You Proceed !!!!')
    //   const order = {
    //       ingredients : this.state.ingredients,
    //       price : this.state.price,
    //       customer : {
    //           name: 'DANISH KHALQUE',
    //           address : {
                  
    //               address : 'XXX ENCLAVE',
    //               zipcode : '1100XX',
    //               city : 'DELHI',
    //               country : 'INDIA'  
    //           },
    //           email : 'khalique.danish@gmail.com'
    //       },
    //       deliveryMethod : 'fastest'
    //   }


    
    //   axios.post('/orders.json'  , order)  // .json is required for firebase
    //   .then(res => {  
    //      this.setState({loading : false, purchasing : false}) // once we get response spinner should stop and MODAL close
    //   }).catch(err => {
    //       this.setState({loading : false, purchasing : false}) // even if unsucessful or error appears we should stop Spinner and Close the MODAL
    //   }) 

    const queryParams = [];
    for( let i in this.state.ingredients) {
        console.log(encodeURIComponent(i))
        console.log(encodeURIComponent(this.state.ingredients[i]))
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i])) // i is the key like in Object.keys eg:=>  
                                        //  ["bacon=2", "cheese=1", "meat=1", "salad=1"]
                                        // 0: "bacon=2"
                                        // 1: "cheese=1"
                                        // 2: "meat=1"
                                        // 3: "salad=1"
                                        // length: 4
    }
    console.log(queryParams)
    
    const queryString = queryParams.join('&'); // &bacon=1&cheese=1&meat=1&salad=1
       
       this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString}); // ?bacon=1&cheese=1&meat=1&salad=1
    }

    

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
            // {salad : true , meat : true ...}
        }

        let orderSummary = null;
        


        

        let burger = this.state.error ? <p>INGREDIENTS NOT FOUND</p> : <Spinner />

        if(this.state.ingredients){

         burger =   ( 
            <>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                added = {this.addItems} 
                removed = {this.removeItems} 
                disabled = {disabledInfo} 
                price = {this.state.price} 
                ordered = {this.purchaseHandler}
                purchasable = {this.state.purchasable}
                backdrop = {this.state.purchasing}   />
             </>
             
        );
        
        orderSummary = (
                <OrderSummary
                ingredients={this.state.ingredients}
                price = {this.state.price}
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
    


export default withErrorHandler(BurgerBuilder,axios)
