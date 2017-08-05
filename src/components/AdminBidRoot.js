import React from 'react'
import AdminBidFormContainer from '../containers/AdminBidFormContainer'

class AdminBid extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="c8 row header-row">
					<span>Citi Auction</span>
					<AdminBidFormContainer />
				</div>
			</div>
			)
	}
}

export default AdminBid