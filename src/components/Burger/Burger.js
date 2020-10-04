// This is the main Burger file where we imported all the ingredients
// Here in the Burger.css we edit the size of the Burger using media Query
// This Burger file will be exported to the BurgerBuilder container
// In place of <div>Burger</div>
// Dynamic logic will be implemented to display ingredients

import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
	let transformedIngredient = Object.keys(props.ingredients)
		.map((igKey) => {
			return [ ...Array(props.ingredients[igKey]) ].map((_, i) => {
				return <BurgerIngredient type={igKey} key={igKey + i} />;
				//  [Array(2), Array(1), Array(2), Array(1)]
			});
		})
		.flat(); //[{…}, {…}, {…}, {…}, {…}, {…}]
	/* .flat() is an alternative to this chunk
	.reduce((arr, el) => {
		return arr.concat(el)
	}, []);
	 */

	
	if (transformedIngredient.length === 0) {
		transformedIngredient = <p>START ADDING INGREDIENTS !</p>;
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredient}

			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default Burger;
