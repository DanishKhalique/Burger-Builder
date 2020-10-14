import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

export class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street : '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        
        this.setState({loading : true}) // on clicking 
      
       const order = {
           ingredients : this.props.ingredients,
           price : this.props.price,
           customer : {
               name: 'DANISH KHALQUE',
               address : {
            
                   address : 'XXX ENCLAVE',
                   zipcode : '1100XX',
                   city : 'DELHI',
                   country : 'INDIA'  
               },
               email : 'khalique.danish@gmail.com'
           },
           deliveryMethod : 'fastest'
        }
       
       axios.post('/orders.json'  , order)  // .json is required for firebase
       .then(res => {  
          this.setState({loading : false}) // once we get response spinner should stop and MODAL close
          this.props.history.push('/');
       }).catch(err => {
           this.setState({loading : false}) // even if unsucessful or error appears we should stop Spinner and Close the MODAL
       }) 

    }

    render() {
        let form = ( 
            <form className={classes.form}>
            <input type="text" name="name" placeholder="Your Name"/>
            <input type="email" name="email" placeholder="Your Email"/>
            <input type="text" name="street" placeholder="Street"/>
            <input type="text" name="postal" placeholder="Postal Code"/>
            <Button btnType="Return" clicked={this.orderHandler}>ORDER</Button>
            </form>);

        if (this.state.loading){
           form = <Spinner />
        }
        return ( 
            <div className={classes.contact__data}>
            <h1>ENTER YOUR DETAILS</h1>
            {form}
            </div>
        )
    }
}

export default ContactData
