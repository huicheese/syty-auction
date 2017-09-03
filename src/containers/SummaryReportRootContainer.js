import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SummaryReportRoot from '../components/SummaryReportRoot'
import * as actions from '../actions'

function mapStateToProps(state) {
  return {
    connection: state.connection
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SummaryReportRoot);