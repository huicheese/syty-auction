import React from 'react'
import AnimateOnChange from 'react-animate-on-change'

const dynoSize = (name: "") => {
  if(name.length < 10) return 1;
  if(name.length < 12) return 2;
  if(name.length < 15) return 3;
  if(name.length < 20) return 4;
  if(name.length < 25) return 5;
  return 0;
}
              // ♛ ♕ ♔ 

const BiddingSlot = ({index, hasChange, bid, bidders, onSlotClick}) => {
	return (

			<div className="slot-container" onClick={onSlotClick}>
        <div className="slot-placeholder  slot-mask">
        <div className="slot-corner" >{index + 1}</div>
        <div className="slot-prize-icon">&nbsp;</div>
          {bid && 
            <div className="slot-bid-container" >
              <div className="slot-bid">
              <AnimateOnChange 
                baseClassName="dummy"
                animationClassName="shining"
                animate={hasChange} >
                  $ {Intl.NumberFormat().format(bid || 0)}
                </AnimateOnChange>
              </div>
              {bidders &&
                <div className="slot-bidder">
                  {bidders.length == 1 && 
                    <span className={"slot-bidder-name-"+dynoSize(bidders[0].firstName)}>
                      <span className="slot-bidder-win">♛ </span><span>{bidders[0].firstName}</span>
                      </span>}
                  {bidders.length == 2 && bidders.map((e,i) => <span key={e.userID} className={"slot-bidder-mul slot-bidder-name-"+dynoSize(e.firstName)}>{e.firstName}</span>)}
                  {bidders.length >= 3 && <span style={{fontStyle:"italic"}}>{bidders.length} Bidders</span>}
                </div>
              }
            </div>
          }
          {!bid && 
            <div className="slot-bid-container slot-bid-empty"><span>Bid Now</span></div>
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