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
		return (
			<div className="container">
				{!this.props.isLoggedIn && 
					<div className="login-required-mask" onClick={this.props.requireLogin}></div>
				}
				{this.props.loginExpanded &&
					<InteractionBox 
						title="First Time Login"
						bodyComponent={<LoginFormContainer />} />
				}
				{this.props.slotRequested &&
					<InteractionBox 
						title={"Slot " + this.props.slotRequested}
						bodyComponent={<BidFormContainer slot={this.props.slotRequested}/>} />
				}
				<div className="c8 row">

					<BiddingSlotBoxContainer />
				</div>

			</div>
		)
	}
}

export default BidSubmissionRoot