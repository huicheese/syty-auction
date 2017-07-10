import React from 'react'

const BiddingSlot = ({index, bid, bidder}) => {
	return (
			<div className="slot-container">
				<div className="slot-placeholder" >
					<div className="slot-index">{index}</div>
					<div className="slot-bid">{bidder}:<br/>$ {bid}</div>
				</div>
			</div>
		)
}
export default BiddingSlot