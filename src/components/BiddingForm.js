import React from 'react';
import { Field, reduxForm } from 'redux-form';
import BiddingNumPad from './BiddingNumPad'
import HighestBidDisplay from './HighestBidDisplay'

class BiddingForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSubmit, onSubmit, pristine, reset, bidRequested, highestBid, hasChange, highestBidders } = this.props;
    return (
      <form className="cal-body" onSubmit={handleSubmit((values, dispatcher) => onSubmit(values, dispatcher, highestBid))}>
      <div className="slot-prize-icon cal-icon">&nbsp;</div>
        <div>
          {highestBid && 
              <HighestBidDisplay hasChange={hasChange} highestBid={highestBid} bidders={highestBidders}/>
          }
          <br/>
          <div>
            <Field name="amount" component={BiddingNumPad} />
          </div>
        </div>
        <br/>
        <div className="interaction-footer">
          <button type="submit" disabled={pristine || bidRequested}>Submit</button>
        </div>
      </form>
    );
  }
};


export default reduxForm({
  form: 'bidding',
})(BiddingForm);