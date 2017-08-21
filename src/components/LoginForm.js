import React from 'react';
import { Form, Field, reduxForm } from 'redux-form';

const LoginForm = props => {
  const { handleSubmit, pristine, reset, loginRequested } = props;
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <div>
          <Field name="firstName" component="input" type="text" placeholder="First Name"/>
        </div>
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <div>
          <Field name="lastName" component="input" type="text" placeholder="Last Name"/>
        </div>
      </div>
      <div>
        <label htmlFor="company">Company</label>
        <div>
          <Field name="company" component="input" type="text" placeholder="Company"/>
        </div>
      </div>
      <div>
        <label htmlFor="firstName">Table</label>
        <div>
          <Field name="table" component="input" type="number" step={1} pattern={"\\d*"} placeholder="Table Number"/>
        </div>
      </div>
      <div className="interaction-footer">
        <button type="submit" disabled={pristine || loginRequested}>Login</button>
      </div>
    </form>
    );
};

export default reduxForm({
  form: 'login',
})(LoginForm);