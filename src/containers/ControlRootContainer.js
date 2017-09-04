import { connect } from 'react-redux'
import ControlRoot from '../components/ControlRoot'
import { toggleSystemPermission, toggleUserPermission, fetchAllUsers, fetchUserBids, deleteBid } from '../actions'

function mapStateToProps(state) {
	return {
    	users: state.users,
    	userBiddings: state.userBiddings
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
	    },

	    onRefreshUserBidsClick: (userID) => {
	    	dispatch(fetchUserBids(userID));
	    },

	    onDeleteBidClick: (bidID, slot, userID) => {
	    	dispatch(deleteBid(bidID, slot, userID));
	    }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlRoot);