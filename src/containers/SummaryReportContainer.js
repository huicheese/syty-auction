import SummaryReport from '../components/SummaryReport'
import { connect } from 'react-redux'
import { expandSlot } from '../actions'

const mapStateToProps = (state, ownProps) => {
  const { slots } = state
  return {
    slots
  }
}

const SummaryReportContainer = connect(mapStateToProps, null)(SummaryReport)
export default SummaryReportContainer