import BiddingSlotBox from '../components/BiddingSlotBox'
import { connect } from 'react-redux'
import { clickSlot } from '../actions'

const mapStateToProps = (state, ownProps) => {
  const { slots } = state.slots
  return {
    slots
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSlotClick: (event, index) => {
      dispatch(clickSlot(index));
    }
  }
}

const BiddingSlotBoxContainer = connect(mapStateToProps, mapDispatchToProps)(BiddingSlotBox)
export default BiddingSlotBoxContainer