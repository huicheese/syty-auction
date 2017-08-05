import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AdminBidRoot from '../components/AdminBidRoot'
import * as actions from '../actions'

function mapStateToProps(state) {
  return { };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminBidRoot);