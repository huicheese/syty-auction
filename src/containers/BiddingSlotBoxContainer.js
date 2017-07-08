import BiddingSlotBox from '../components/BiddingSlotBox'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  const { slots } = state
  return {
  	slots
  }
}

const BiddingSlotBoxContainer = connect(mapStateToProps)(BiddingSlotBox)
export default BiddingSlotBoxContainer