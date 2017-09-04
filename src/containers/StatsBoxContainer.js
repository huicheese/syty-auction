import { connect } from 'react-redux'
import StatsBox from '../components/StatsBox'

function mapStateToProps(state) {
  const {bidders, byUser, top3} = state.slots
  const myID = state.user.userID
  
  return {
    mySlots: byUser[myID] || [],
    me: bidders[myID] || {},
    top3: top3 || []
  };
}

export default connect(
  mapStateToProps
)(StatsBox);