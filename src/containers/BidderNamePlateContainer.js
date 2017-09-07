import { connect } from 'react-redux'
import BidderNamePlate from '../components/BidderNamePlate'

const mapStateToProps = (state, ownProps) => {
  const { bidders } = state.slots
  let bidder = ownProps.bidder
  
  return {
    dyno: ownProps.dyno,
    name: bidder.firstName,
    sum: (bidders[bidder.userID] && bidders[bidder.userID].sum) || 0,
    goldenLimit: state.goldenLimit
  }
}


const BidderNamePlateContainer = connect(mapStateToProps, {})(BidderNamePlate)
export default BidderNamePlateContainer