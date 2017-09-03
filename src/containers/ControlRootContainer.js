import { connect } from 'react-redux'
import ControlRoot from '../components/ControlRoot'
import { toggleSystemPermission } from '../actions'

function mapDispatchToProps(dispatch) {
  return {
    onSystemPermissionClick: () => {
    	dispatch(toggleSystemPermission());
    }
  };
}

export default connect(null, mapDispatchToProps)(ControlRoot);