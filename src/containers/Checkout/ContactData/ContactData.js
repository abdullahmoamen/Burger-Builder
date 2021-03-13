import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/input/input';

class ContactData extends Component {
    state = {

        orderForm :{
            name: {
                elType: 'input',
                elConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Name...'
                },
                value: '',
                validation:{
                    required:true,
                    validationText: 'Your Name Is Required',
                },
                valid:false,
                touched:false,
            },
                street: {
                    elType: 'input',
                    elConfig: {
                        type: 'text',
                        placeholder: 'Street...'
                    },
                    value: '',
                    validation:{
                        required:true,
                        validationText: 'Your Street Name Is Required',

                    },
                    valid:false,
                    touched:false,
                },
                zipCode: {
                    elType: 'input',
                    elConfig: {
                        type: 'text',
                        placeholder: 'ZipCode...'
                    },
                    value: '',
                    validation:{
                        required:true,
                        minLength:5,
                        maxLength:5,
                        validationText: 'Your ZipCode Is Required',

                    },
                    valid:false,
                    touched:false,
                },
                country: {
                    elType: 'input',
                    elConfig: {
                        type: 'text',
                        placeholder: 'Your Country...',
                    },
                    value: '',
                    validation:{
                        required:true,
                        validationText: 'Your Country Is Required...',

                    },
                    valid:false,
                    touched:false,
                    },

                email:{
                    elType: 'input',
                    elConfig: {
                        type: 'email',
                        placeholder: 'Your Email...',
                    },
                    value: '',
                    validation:{
                        required:true,
                        validationText: 'Your Email Is Required',
                    },
                    valid:false,
                    touched:false,
                    },

                deliveryMethod:{
                    elType: 'select',
                    elConfig: {
                        options: [
                            {value: 'Fastest' , displayValue: 'Fastest'},
                            {value: 'cheapest' , displayValue: 'cheapest'}
                        ],
                    },
                    value: '',
                    validation:{},
                    valid:true
                },
            },
            formIsValid: false,
            loading:false,
}


    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData ={};
        for(let formElId in this.state.orderForm){
            formData[formElId] =this.state.orderForm[formElId].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            deliveryMethod: 'fastest',
            orderData: formData
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }

    //validation handler
    checkValidity(value , rules){
        let isValid =true;

        if(rules.required){
            isValid =value.trim() !=='' && isValid;
        }
        if(rules.minLength){
            isValid=value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid=value.length <= rules.maxLength && isValid;
        }
        return isValid
    }

    inputChangeHandler =(e , inputId)=>{
        // console.log(e.target.value);
        //1- clone
        const updatedOrderForm ={
            ...this.state.orderForm
        }
        const updatedFormEl={
            ...updatedOrderForm[inputId] //inputId=> email , name , country ...
        } 
        //2-update
        updatedFormEl.value = e.target.value;
        updatedFormEl.valid=this.checkValidity(updatedFormEl.value,updatedFormEl.validation)
        updatedFormEl.touched=true;
        updatedOrderForm[inputId] =updatedFormEl;

        let formIsValid = true;
        for(let inputId in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].valid && formIsValid;
        }
        
        // 3- setState
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
        
    }

    render () {

        const formElArr=[];
        for(let key in this.state.orderForm){
            formElArr.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {
                formElArr.map(formEl=>(
                    <Input 
                    key={formEl.id}
                    elType={formEl.config.elType}
                    elConfig={formEl.config.elConfig}
                    value={formEl.config.value}
                    invalid={!formEl.config.valid}
                    shouldValidate={formEl.config.validation}
                    touched={formEl.config.touched}
                    change={(e)=>this.inputChangeHandler(e,formEl.id)}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h3 className={classes.Heading}>Enter your Contact Data Here</h3>
                {form}
            </div>
        );
    }
}

export default ContactData;