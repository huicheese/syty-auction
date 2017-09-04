import ActivityEventBox from '../components/ActivityEventBox'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  const { activityEvents } = state

  return {
  	activityEvents
  }
}

const ActivityEventBoxContainer = connect(mapStateToProps)(ActivityEventBox)
export default ActivityEventBoxContainer