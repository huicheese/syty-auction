import React from 'react'
import AnimateOnChange from 'react-animate-on-change'


const BiddingSlot = ({index, hasChange, bid, bidder, onSlotClick}) => {
  let animateStyle = bid != undefined ? {opacity: 0.8} : {}
	return (

			<div className="slot-container slot-mask" onClick={onSlotClick}>
        <div className="slot-placeholder">
          <div className="slot-index">{index + 1}</div>
          { bidder &&
            <div className="slot-bid">{bidder}:<br/>$ {bid}</div> }
          <AnimateOnChange 
          baseClassName="slot-highlight"
          animationClassName="slot-highlight-blink"
          animate={hasChange} ><null/>
        </AnimateOnChange>  
            </div>
			</div>
		)
}
export default BiddingSlot