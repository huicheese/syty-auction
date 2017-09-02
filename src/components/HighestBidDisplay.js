import React from 'react';
import AnimateOnChange from 'react-animate-on-change'

const HighestBidDisplay = (props) => {

  const {hasChange, highestBid} = props
  return (
      <div className="">Current Bid: 
        <AnimateOnChange 
          baseClassName="dummy"
          animationClassName="shining"
          animate={hasChange || false} >
          &nbsp; $ {Intl.NumberFormat().format(highestBid || 0)}
        </AnimateOnChange>
      </div>
    )
}

export default HighestBidDisplay