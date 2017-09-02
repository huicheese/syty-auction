import React from 'react';
import { Field, reduxForm } from 'redux-form';
import BiddingNumPad from './BiddingNumPad'
import HighestBidDisplay from './HighestBidDisplay'

class BiddingForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSubmit, pristine, reset, bidRequested, highestBid, hasChange } = this.props;
    return (
      <form className="cal-body" onSubmit={handleSubmit}>
      <div className="slot-prize-icon cal-icon">&nbsp;</div>
        <div>
          {highestBid && 
              <HighestBidDisplay hasChange={hasChange} highestBid={highestBid} />
          }
          <br/>
          <div>
            <Field name="amount" component={BiddingNumPad} />
          </div>
        </div>
        <br/>
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