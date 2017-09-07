import React from 'react'
import BiddingSlotBoxContainer from '../containers/BiddingSlotBoxContainer'
import LoginFormContainer from '../containers/LoginFormContainer'
import BidFormContainer from '../containers/BidFormContainer'
import ActivityEventBoxContainer from '../containers/ActivityEventBoxContainer'
import InteractionBox from './InteractionBox'
import StatsBoxContainer from '../containers/StatsBoxContainer'
import NotificationCentreContainer from '../containers/NotificationCentreContainer'

class BidSubmissionRoot extends React.Component {

	componentDidMount() {
		this.props.initializeConnection();
	}

	render() {
		const {requireLogin, slotRequested, loginExpanded, isLoggedIn} = this.props;
		return (
			<div className="container">
				<NotificationCentreContainer />
				<ActivityEventBoxContainer />
				{!isLoggedIn && 
					<div className="login-required-mask" onClick={requireLogin}></div>
				}
				{loginExpanded &&
					<InteractionBox 
						title="First Time Bidder?"
						bodyComponent={<LoginFormContainer />} />
				}
				{slotRequested &&
					<InteractionBox 
						title={"Slot " + slotRequested}
						bodyComponent={<BidFormContainer slot={slotRequested}/>} />
				}
				
				<StatsBoxContainer />
				<div className="c8 row">
					<div className="block"> </div>
					<BiddingSlotBoxContainer />
				</div>

			</div>
		)
	}
}

export default BidSubmissionRoot