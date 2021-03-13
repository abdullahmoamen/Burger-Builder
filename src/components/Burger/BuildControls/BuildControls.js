import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
    { label: 'Hot sauce', type: 'Hot_sauce' },

];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p style={{fontWeight:'bold', marginLeft:'90px' ,boxShadow:'5px 7px 6px #ccc'}}>
        Current Price: <strong style={{color:"#5F9EA0" , fontFamily:"cursive"}}>{props.price.toFixed(2)} EGP</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;