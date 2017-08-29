import React from 'react'
import BiddingSlotBoxContainer from '../containers/BiddingSlotBoxContainer'
import LoginFormContainer from '../containers/LoginFormContainer'
import BidFormContainer from '../containers/BidFormContainer'
import InteractionBox from './InteractionBox'

class BidSubmissionRoot extends React.Component {

	componentDidMount() {
		this.props.initializeConnection();
	}

	render() {
		const {requireLogin, slotRequested, loginExpanded, isLoggedIn} = this.props;
		return (
			<div className="container">
				{!isLoggedIn && 
					<div className="login-required-mask" onClick={requireLogin}></div>
				}
				{loginExpanded &&
					<InteractionBox 
						title="First Time Login"
						bodyComponent={<LoginFormContainer />} />
				}
				{slotRequested &&
					<InteractionBox 
						title={"Slot " + slotRequested}
						bodyComponent={<BidFormContainer slot={slotRequested}/>} />
				}
				<div className="c8 row">

					<BiddingSlotBoxContainer />
				</div>

			</div>
		)
	}
}

export default BidSubmissionRoot