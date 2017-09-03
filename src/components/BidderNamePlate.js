import React from 'react'

const dynoSize = (name: "", dyno) => {
  if(!dyno) return 0;

  if(name.length < 8) return 1;
  if(name.length < 12) return 2;
  if(name.length < 15) return 3;
  if(name.length < 20) return 4;
  if(name.length < 25) return 5;
  return 0;
}

const BidderNamePlate = (props) => {
// ♥💛
  const {bidder, dyno=true} = props
  return (
      <span className={"slot-bidder-name-"+dynoSize(bidder.firstName, dyno)}>
        <span className="bidder-c bidder-l">♥ </span><span className={""}>{bidder.firstName}</span>
      </span>
    )
}

export default BidderNamePlate