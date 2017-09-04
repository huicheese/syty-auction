import { connect } from 'react-redux'
import ControlRoot from '../components/ControlRoot'
import { toggleSystemPermission, toggleUserPermission, fetchAllUsers } from '../actions'

function mapStateToProps(state) {
	return {
    	users: state.users
  	};
}

function mapDispatchToProps(dispatch) {
	return {
	    onSystemPermissionClick: () => {
	    	dispatch(toggleSystemPermission());
	    },

	    onUserPermissionClick: (userID) => {
	    	dispatch(toggleUserPermission(userID));
	    },

	    onRefreshUsersClick: () => {
	    	dispatch(fetchAllUsers());
	    }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlRoot);