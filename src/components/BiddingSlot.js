import React from 'react'

const BiddingSlot = ({index, bid, bidder, onSlotClick}) => {
	return (
			<div className="slot-container slot-mask" onClick={onSlotClick}>
				<div className="slot-placeholder" >
					<div className="slot-index">{index + 1}</div>
					{ bidder &&
						<div className="slot-bid">{bidder}:<br/>$ {bid}</div> }
				</div>
			</div>
		)
}
export default BiddingSlot