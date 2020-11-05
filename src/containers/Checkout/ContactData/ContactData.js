import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Forms/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
export class ContactData extends Component {
	state = {
		orderForm : {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false
			},

			address: {
				elementType: 'textarea',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Address'
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code'
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				minLenght : 5,
				maxLength : 5
			},
			city: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Enter City'
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Enter Country'
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email'
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fastest'},
						{value: 'cheapest', displayValue: 'Cheapest'}
					]
				},
				value: 'fastest',
				validation: {},
				valid: true
			},
			
		},	
		formIsvalid: false,	
	};

	checkValidity(value, rules) {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		
		
		if(rules.minLength){
			isValid = value.minLength >= rules.minLength  && isValid
		}
		
		if(rules.maxLength){
			isValid = value.maxLength <= rules.maxLength  && isValid
		}

		return isValid;
	}

	orderHandler = (event) => {
		event.preventDefault();
		//this.setState({ loading: true }); // on clicking

		const formData = {};
		for(let formElementIdentifier in this.state.orderForm){
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
			//console.log(`==>` + formData[formElementIdentifier])
			
		}


		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData

			
		};

		this.props.onOrderBurger(order)
		// axios
		// 	.post('/orders.json', order) // .json is required for firebase
		// 	.then((res) => {
		// 		this.setState({ loading: false }); // once we get response spinner should stop and MODAL close
		// 		this.props.history.push('/');
		// 	})
		// 	.catch((err) => {
		// 		this.setState({ loading: false }); // even if unsucessful or error appears we should stop Spinner and Close the MODAL
		// 	});
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = { 
			...this.state.orderForm
		}

		const updatedFormElement = {
			...this.state.orderForm[inputIdentifier]
		}

		updatedFormElement.value = event.target.value
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
		
		updatedOrderForm[inputIdentifier] = updatedFormElement
		console.log(updatedFormElement)

		this.setState({orderForm: updatedOrderForm})
	}
	

	render() {
		const formElementsArray = []
		for(let key in this.state.orderForm){
			formElementsArray.push(
			{	id: key,
				config: this.state.orderForm[key]
			}
			)
			
		}
		let form = (
			<form className={classes.form}>
				{formElementsArray.map(formElement => (
					<Input key={formElement.id}
						   elementType={formElement.config.elementType}
						   elementConfig={formElement.config.elementConfig}
						   value={formElement.config.value} 
						   changed = {(event) => this.inputChangedHandler(event, formElement.id)}
						   invalid = {! formElement.config.valid}
						   shouldVakidate= {formElement.config.validation}/>
					))}
				<Button btnType="Return" clicked={this.orderHandler}>
					ORDER
				</Button>
			</form>
		);

		if (this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.contact__data}>
				<h1>ENTER YOUR DETAILS</h1>
				{form}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return{
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
