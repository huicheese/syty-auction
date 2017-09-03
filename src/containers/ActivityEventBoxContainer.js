import ActivityEventBox from '../components/ActivityEventBox'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  const { activityEvents,slots } = state
  let sum = {}
  slots.forEach(s=> {
    if(s.highestBidders && s.highestBidders.length == 1) {
      sum[s.highestBidders[0].userID] = s.highestBidders[0].sum;
    }
  })
  activityEvents.forEach(a => {
    if(a.bidder && a.bidder.userID)
      a.bidder.sum = sum[a.bidder.userID];
  })

  return {
  	activityEvents
  }
}

const ActivityEventBoxContainer = connect(mapStateToProps)(ActivityEventBox)
export default ActivityEventBoxContainer