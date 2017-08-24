import React from 'react'
import AnimateOnChange from 'react-animate-on-change'

const BiddingSlot = ({index, hasChange, bid, bidder, onSlotClick}) => {
  let animateStyle = bid != undefined ? {opacity: 0.8} : {}

  let bidders = [bidder];
	return (

			<div className="slot-container slot-mask" onClick={onSlotClick}>
        <div className="slot-placeholder">
        <div className="slot-corner" />
          <div className="slot-index">{index + 1}</div>
          {bid && 
            <div className="slot-bid"><span>$ </span><span>{Intl.NumberFormat().format(bid || 0)}</span></div>}

          {bidders &&
            <div className="slot-bidder">
              {bidders.length <= 2 && bidders.map((e,i) => <div key={e}>{e}</div>)}
              {bidders.length >= 3 && <div style={{fontStyle:"italic"}}>{bidders.length} Bidders</div>}
            </div>
          }
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