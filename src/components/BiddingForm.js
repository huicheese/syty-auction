import React from 'react';
import { Field, reduxForm } from 'redux-form';
import BiddingNumPad from './BiddingNumPad'
import AnimateOnChange from 'react-animate-on-change'

const BiddingForm = props => {
  const { handleSubmit, pristine, reset, bidRequested, highestBid,hasChange } = props;
  return (
    <form className="cal-body" onSubmit={handleSubmit}>
    <div className="slot-prize-icon cal-icon">&nbsp;</div>
      <div>
        {highestBid && 
          <div className="">Current Bid: 
            <AnimateOnChange 
              baseClassName="dummy"
              animationClassName="shining"
              animate={hasChange} >
              &nbsp; $ {Intl.NumberFormat().format(highestBid || 0)}
            </AnimateOnChange>
          </div>
        }
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