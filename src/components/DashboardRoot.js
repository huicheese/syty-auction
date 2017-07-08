import React from 'react'
import BiddingSlotBoxContainer from '../containers/BiddingSlotBoxContainer'
import ActivityEventBoxContainer from '../containers/ActivityEventBoxContainer'

class Dashboard extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="c8 row header-row">
					<span>Citi Auction</span>
				</div>

				<div className="c8 row">
					<BiddingSlotBoxContainer />
					<ActivityEventBoxContainer />
				</div>

			</div>
			)
	}
}

export default Dashboard