import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1><strong>We hope it tastes well!</strong></h1>
			<div style={{ width: '100%', margin: 'auto' }}>
				<Burger ingredients={props.ingredients} />
			</div>

			<Button btnType="Proceed" clicked={props.checkoutCancel}>
				 CANCEL
			</Button>
			<Button btnType="Return" clicked={props.checkoutContinued}>
				CONTINUE
			</Button>
		</div>
	);
};

export default CheckoutSummary;
