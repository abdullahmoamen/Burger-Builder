import React from 'react';
import classes from './input.css';

const input =(props)=>{
    let inputEl=null;
    const inputClasses=[classes.InputEl];

    if(props.invalid && props.shouldValidate &&props.touched){
        inputClasses.push(classes.Invalid)
    }

    switch( props.elType ){
        case ('input'):
            inputEl=<input required
            onChange={props.change}
            className={inputClasses.join(' ')}
            {...props.elConfig} 
            value={props.value} />
            break;

        case ('textarea'):
            inputEl=<textarea required
            onChange={props.change}
            className={inputClasses.join(' ')}
            {...props.elConfig} 
            value={props.value} />
            break;

            case ('select'):
                inputEl=
                (
                <select required
                onChange={props.change}
                className={inputClasses.join(' ')}
                value={props.value}>
                    {props.elConfig.options.map(option =>(
                    <option 
                    value={option.value}
                    key={option.value}
                    >
                        {option.displayValue}
                    </option>
                    ))}
                </select>
                )
                break;
        
        default:
            inputEl=<input
            onChange={props.change}
            className={classes.InputEl}
            {...props.elConfig} 
            value={props.value} />
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.Erorrtext}>Please Enter a valid value!</p>;
    }

    return (
    <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {validationError}
        {inputEl}
    </div>
);

    };

export default input;