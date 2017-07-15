import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DashboardRoot from '../components/DashboardRoot'
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
)(DashboardRoot);