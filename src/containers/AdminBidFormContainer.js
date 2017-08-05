import { connect } from 'react-redux'
import AdminBiddingForm from '../components/AdminBiddingForm'
import { fetchAdminBid } from '../actions'

function mapStateToProps(state) {
  return {
    bidRequested: false // TODO
  };
}

function mapDispatchToProps() {
  return {
    onSubmit: (values, dispatch) => {
    	dispatch(fetchAdminBid(
                  values.firstName,
                  values.lastName,
                  values.company,
                  values.table,
                  values.slot,
                  values.amount));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminBiddingForm);