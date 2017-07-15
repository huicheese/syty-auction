import React from 'react'
import BiddingSlotBoxContainer from '../containers/BiddingSlotBoxContainer'
import ActivityEventBoxContainer from '../containers/ActivityEventBoxContainer'

class Dashboard extends React.Component {

  	componentDidMount() {
    	this.props.actions.initializeConnection();
  	}

	render() {
		return (
			<div className="container">
				<div className="c8 row header-row">
					<span>Citi Auction</span>
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