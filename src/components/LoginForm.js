import React from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import RenderedInput, { RenderedNumberInput } from './RenderedInput'

const LoginForm = props => {
  const { handleSubmit, pristine, reset, loginRequested } = props;
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <Field name="firstName" component={RenderedInput} type="text" 
          label="First Name *"
          placeholder="Display Name"/>
      <Field name="lastName" component={RenderedInput} type="text" 
          label="Last Name *"
          placeholder="Last Name"/>
      <Field name="company" component={RenderedInput} type="text" 
          label="Company *"
          placeholder="Company"/>
      <Field name="table" component={RenderedNumberInput} type="number" step={1} pattern={"\\d*"}  
          label="Table *"
          placeholder="Table Number"/>
      <br/>
      <div className="interaction-footer">
        <button type="submit" disabled={pristine || loginRequested}>Start Bidding!</button>
      </div>
    </form>
    );
};

export default reduxForm({
  form: 'login',
})(LoginForm);