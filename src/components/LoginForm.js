import React from 'react';
import { Form, Field, reduxForm } from 'redux-form';

const LoginForm = props => {
  const { handleSubmit, pristine, reset, loginRequested } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <div>
          <Field name="firstName" component="input" type="text" placeholder="First Name"/>
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field name="lastName" component="input" type="text" placeholder="Last Name"/>
        </div>
      </div>
      <div>
        <label>Company</label>
        <div>
          <Field name="company" component="input" type="text" placeholder="Company"/>
        </div>
      </div>
      <div>
        <label>Table</label>
        <div>
          <Field name="table" component="input" type="text" placeholder="Table Number"/>
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || loginRequested}>Login</button>
      </div>
    </form>
    );
};

export default reduxForm({
  form: 'login',
})(LoginForm);