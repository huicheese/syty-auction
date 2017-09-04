import { connect } from 'react-redux'
import BiddingForm from '../components/BiddingForm'
import { fetchBid } from '../actions'

function mapStateToProps(state, ownProps) {
  const {slots} = state.slots
  return {
    bidRequested: false, // TODO
    initialValues: {
      slot: ownProps.slot, 
      // amount: 0
      amount: slots[ownProps.slot - 1].highestBid || 0
    },
    highestBid: slots[ownProps.slot - 1].highestBid,
    hasChange: slots[ownProps.slot - 1].hasChange,
    highestBidders: slots[ownProps.slot - 1].highestBidders
  };
}

function mapDispatchToProps() {
  return {
    onSubmit: (values, dispatch) => {
    	dispatch(fetchBid(values.slot, 	values.amount));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BiddingForm);