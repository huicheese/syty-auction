import { connect } from 'react-redux'
import BidderNamePlate from '../components/BidderNamePlate'

const mapStateToProps = (state, ownProps) => {
  const { bidders } = state.slots
  let bidder = ownProps.bidder
  bidder.sum = (bidders[bidder.userID] && bidders[bidder.userID].sum) || 0
  return {
    dyno: ownProps.dyno || true,
    bidder
  }
}


const BidderNamePlateContainer = connect(mapStateToProps, {})(BidderNamePlate)
export default BidderNamePlateContainer