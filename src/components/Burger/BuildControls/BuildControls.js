// BuildControl(s) is what will come below the burger
// File is similar to Burger.js. Here also BuildControl.js will be imported
// This file has BuildControls.css file which is giving shape to the box
// Box will contain the ingredients with + - button
// Created BuildControl because it is a reusable component
import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'BACON', type: 'bacon' },
	{ label: 'CHEESE', type: 'cheese' },
	{ label: 'MEAT', type: 'meat' },
	{ label: 'SALAD', type: 'salad' }
];

const BuildControls = (props) => {
	return (
		<div className={classes.BuildControls}>
			<p>
				<strong>Current Price : {props.price.toFixed(2)}</strong>
			</p>
			{controls.map((cur) => {
				{
					/* console.log(cur) */
				}
				return (
					<BuildControl
						key={cur.label}
						label={cur.label}
						add={() => props.added(cur.type)}
						remove={() => props.removed(cur.type)}
						disabled={props.disabled[cur.type]}

					/>
				);
			})}
			<button 
			className = {classes.ButtonOrd}
			disabled ={ !props.purchasable}
			onClick={props.ordered} ><strong>ORDER NOW!</strong></button>
		</div>
	);
};

export default BuildControls;
