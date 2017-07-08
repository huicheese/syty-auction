import React from 'react'

const BiddingSlot = ({index, bid, bidder}) => {
	return (
			<div className="slot-container">
				<div className="slot-placeholder" >{index}<br/>{bidder}<br/>{bid}</div>
			</div>
		)
}
export default BiddingSlot