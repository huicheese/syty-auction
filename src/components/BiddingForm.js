import React from 'react';
import { Field, reduxForm } from 'redux-form';
import BiddingNumPad from './BiddingNumPad'

const BiddingForm = props => {
  const { handleSubmit, pristine, reset, bidRequested, highestBid } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {highestBid && <div className="">Current Highest Bid: S$ {highestBid}</div>}
        <br/>
        <div>
          <Field name="amount" component={BiddingNumPad} />
        </div>
      </div>
      <div className="interaction-footer">
        <button type="submit" disabled={pristine || bidRequested}>Submit</button>
      </div>
    </form>
    );
};


export default reduxForm({
  form: 'bidding',
})(BiddingForm);