import React from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import BiddingNumPad from './BiddingNumPad'

const BiddingForm = props => {
  const { handleSubmit, pristine, reset, bidRequested } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Amount</label>
        <div>
          <Field name="amount" component="input" type="number" placeholder="Please input your bid"/>
        </div>
        <BiddingNumPad />
      </div>
      <div>
        <button type="submit" disabled={pristine || bidRequested}>Submit</button>
      </div>
    </form>
    );
};


export default reduxForm({
  form: 'bidding',
})(BiddingForm);