import React from 'react'
import BiddingSlot from './BiddingSlot'

const BiddingSlotBox = ({slots}) => {
	return (
			<div className="row slot-row">
				{
					slots.map((entry, key) =>
							<BiddingSlot key={entry.index} 
							index={entry.index} 
							bid={entry.highestBid}
							bidder={entry.highestBidder.firstName} />
						)
				}
			</div>
		)
}

export default BiddingSlotBox