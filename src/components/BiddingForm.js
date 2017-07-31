import React from 'react';
import { Form, Field, reduxForm } from 'redux-form';

const BiddingForm = props => {
  const { handleSubmit, pristine, reset, bidRequested } = props;
  return (
    <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={pristine || bidRequested}>Login</button>
      </div>
    </form>
    );
};

export default reduxForm({
  form: 'bidding',
})(BiddingForm);