import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { setPropsAsInitial } from './../helpers/setPropsAsInitial';
import CustomersActions from './CustomersActions';

/*const isRequired = value => (
    !value && "Este campo es requerido"
);
*/
const isNumber = value => (
    isNaN(Number(value)) && "El campo debe ser número"
);

const MyField = ({ input, meta, type, label, name }) => (
    <div>
        <label htmlFor={ name }>{ label }</label>
        <input { ...input } type={ !type ? "text" : type }/>
        {
            meta.touched && meta.error && <span>{ meta.error }</span>
        }
    </div>
);

const CustomerEdit = ({ name, dni, age, handleSubmit, submitting, onBack }) => {
    return (
        <div>
            <h2>Edición del cliente</h2>
            <form onSubmit={ handleSubmit }>
                <div>
                    <Field 
                        name="name"
                        component={ MyField }
                        type="text"
                        label="Nombre"></Field>
                </div>
                <div>
                    <Field
                        name="dni"
                        component={ MyField }
                        type="text"
                        label="DNI"></Field>
                </div>
                <div>
                    <Field
                        name="age"
                        component={ MyField }
                        type="number"
                        validate={ isNumber }
                        label="Edad"></Field>
                </div>
                <CustomersActions>
                    <button type="submit" disabled={ submitting }>Aceptar</button>
                    <button onClick={ onBack }>Cancelar</button>
                </CustomersActions>
            </form>
        </div>
    );
};

CustomerEdit.propTypes = {
    name: PropTypes.string,
    dni: PropTypes.string,
    age: PropTypes.number,
    onBack: PropTypes.func.isRequired
};

const validate = values => {
    const error = {};
    
    if (!values.name){
        error.name = "El campo nombre es requerido";
    }
    
    if(!values.dni){
        error.dni  = "El DNI es un campo obligatorio";
    }
    
    return error;
}

const CustomerEditForm = reduxForm(
    {
        form: 'CustomerEdit',
        validate 
})(CustomerEdit);

export default setPropsAsInitial(CustomerEditForm);