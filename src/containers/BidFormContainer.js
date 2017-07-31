import { connect } from 'react-redux'
import BiddingForm from '../components/BiddingForm'
import { fetchBid } from '../actions'

function mapStateToProps(state) {
  return {
    bidRequested: false // TODO
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