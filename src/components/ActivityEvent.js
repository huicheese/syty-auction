import React from 'react'

const generateActivity = (index, someone, bidInput, slot) => {
  let bid = Intl.NumberFormat().format(bidInput);
  switch(index) {
    default:
      return someone + " bids $ " + bid + " on slot " + slot;

  }
}

const simpleHashIndex = (index) => parseInt((index || "000").substring(0,3), 16) % 3

const ActivityEvent = ({entry}) => {
	return (
			<span>{generateActivity(simpleHashIndex(entry.index), entry.bidder.firstName, entry.bid, entry.slot)}</span>
		)
}

export default ActivityEvent