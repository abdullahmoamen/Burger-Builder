import React from 'react';

import classes from './Order.css';

const order = ( props ) => {
    const ingredients = [];

    for ( let ingredientName in props.ingredients ) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #000',
                borderRadius:'10px',
                padding: '5px',
                backgroundColor: 'cornsilk'
                }}
            key={ig.name}> {ig.name} ({ig.amount})</span>;
    });

    return (
        <div className={classes.Order}>
            <p style={{color:'black', fontFamily:'cursive'}}><strong style={{color:'goldenrod'}}>Ingredients:</strong> {ingredientOutput}</p>
            <p>Price: <strong style={{color:'red'}}>{Number.parseFloat( props.price ).toFixed( 2 )} EGP</strong></p>
        </div>
    );
};

export default order;