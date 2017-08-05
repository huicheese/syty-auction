import React from 'react';
import { Form, Field, reduxForm } from 'redux-form';

const AdminBiddingForm = props => {
  const { handleSubmit, pristine, reset, bidRequested } = props;
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
        <label>Slot</label>
        <div>
          <Field name="slot" component="input" type="text" placeholder="Slot #"/>
        </div>
      </div>
      <div>
        <label>Amount</label>
        <div>
          <Field name="amount" component="input" type="number" placeholder="Please input your bid"/>
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || bidRequested}>Submit</button>
      </div>
    </form>
    );
};

export default reduxForm({
  form: 'adminBidding',
})(AdminBiddingForm);