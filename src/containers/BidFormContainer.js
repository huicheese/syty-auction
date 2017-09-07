import { connect } from 'react-redux'
import BiddingForm from '../components/BiddingForm'
import { fetchBid, bidFail } from '../actions'

function mapStateToProps(state, ownProps) {
  const {slots} = state.slots
  let slot = slots[ownProps.slot - 1]
  return {
    bidRequested: false, // TODO
    initialValues: {
      slot: ownProps.slot, 
      // amount: 0
      amount: slot.highestBid || 0,
      highestBid: slot.highestBid
    },
    highestBid: slot.highestBid,
    hasChange: slot.hasChange,
    highestBidders: slot.highestBidders
  };
}

function mapDispatchToProps() {
  return {
    onSubmit: (values, dispatch, highestBid) => {
      if(highestBid && values.amount <= highestBid)
        dispatch(bidFail(null, "Current highest bid is $" + highestBid, values.slot,  values.amount));
      else
    	  dispatch(fetchBid(values.slot, 	values.amount));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BiddingForm);