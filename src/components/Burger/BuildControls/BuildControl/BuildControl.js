// This file is just like BurgerIngredient.js
// We will be exporting the buttons and label to BuildControl(s)
import React from 'react';
import classes from './BuildControl.module.css';

const BuildControl = (props) => {
	return (
		<div className={classes.BuildControl}>
			<div className={classes.Label}>{props.label}</div>
			<button className={classes.More} onClick={props.add}>
				MORE
			</button>
			<button className={classes.Less} onClick={props.remove} disabled={props.disabled}>
				{/* disabled is a React func */}
				LESS
			</button>
		</div>
	);
};

export default BuildControl;
