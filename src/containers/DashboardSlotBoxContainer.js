import BiddingSlotBox from '../components/BiddingSlotBox'
import { connect } from 'react-redux'
import { expandSlot } from '../actions'

const mapStateToProps = (state, ownProps) => {
  const { slots } = state.slots
  return {
    slots
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSlotClick: (event, index) => {
      dispatch(expandSlot(index));
    }
  };
}

const DashboardSlotBoxContainer = connect(mapStateToProps, mapDispatchToProps)(BiddingSlotBox)
export default DashboardSlotBoxContainer