import React from 'react'
import BiddingSlotBoxContainer from '../containers/BiddingSlotBoxContainer'
import ActivityEventBoxContainer from '../containers/ActivityEventBoxContainer'
import LoginFormContainer from '../containers/LoginFormContainer'
import BidFormContainer from '../containers/BidFormContainer'

class Dashboard extends React.Component {

  	componentDidMount() {
    	this.props.actions.initializeConnection();
  	}

	render() {
		return (
			<div className="container">
				<div className="c8 row header-row">
					<span>Citi Auction</span>
					<LoginFormContainer />
					<BidFormContainer />
				</div>

				<div className="c8 row">
					<BiddingSlotBoxContainer />
					&nbsp;
					<ActivityEventBoxContainer />
				</div>

			</div>
			)
	}
}

export default Dashboard