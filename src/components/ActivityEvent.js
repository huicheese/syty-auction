import React from 'react'
import BidderNamePlateContainer from '../containers/BidderNamePlateContainer'

const generateActivity = (index, bidder, bidInput, slot) => {
  let bid = Intl.NumberFormat().format(bidInput);
  switch(index) {
    default:
      return <div className="event"><BidderNamePlateContainer bidder={bidder} dyno={false}/>{"\xa0\xa0bids $ " + bid + " on cupcake " + slot}</div>;

  }
}

const simpleHashIndex = (index) => parseInt((index || "000").substring(0,3), 16) % 3

const ActivityEvent = ({entry}) => {
  
	return (
			generateActivity(simpleHashIndex(entry.index), entry.bidder, entry.bid, entry.slot)
		)
}

export default ActivityEvent