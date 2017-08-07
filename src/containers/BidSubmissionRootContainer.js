import { connect } from 'react-redux'
import BidSubmissionRoot from '../components/BidSubmissionRoot'
import { initializeConnection, expandLogin } from '../actions'

function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn,
    loginExpanded: state.interaction.loginExpanded,
    slotRequested: state.interaction.slotRequested
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initializeConnection: () => dispatch(initializeConnection()),
    requireLogin: () => dispatch(expandLogin())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BidSubmissionRoot);