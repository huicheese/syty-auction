import BiddingSlotBox from '../components/BiddingSlotBox'
import { connect } from 'react-redux'
import { expandSlot } from '../actions'

const mapStateToProps = (state, ownProps) => {
  const { slots } = state
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

const BiddingSlotBoxContainer = connect(mapStateToProps, mapDispatchToProps)(BiddingSlotBox)
export default BiddingSlotBoxContainer