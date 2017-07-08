import React from 'react'
import BiddingSlot from './BiddingSlot'

const BiddingSlotBox = ({slots}) => {
	return (
			<div className="row slot-row">
				{
					slots.map((entry, key) =>
							<BiddingSlot key={key} 
							index={entry.index} 
							bid={entry.highestBid}
							bidder={entry.name} />
						)
				}
			</div>
		)
}

export default BiddingSlotBox