import React from 'react'
import BidderNamePlate from './BidderNamePlate'

const generateActivity = (index, bidder, bidInput, slot) => {
  let bid = Intl.NumberFormat().format(bidInput);
  switch(index) {
    default:
      return <span><BidderNamePlate bidder={bidder} dyno={false}/>{"\xa0\xa0bids $ " + bid + " on slot " + slot}<br/></span>;

  }
}

const simpleHashIndex = (index) => parseInt((index || "000").substring(0,3), 16) % 3

const ActivityEvent = ({entry}) => {
  
	return (
			<span>{generateActivity(simpleHashIndex(entry.index), entry.bidder, entry.bid, entry.slot)}</span>
		)
}

export default ActivityEvent