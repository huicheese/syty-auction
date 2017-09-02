import React from 'react'

const ActivityEvent = ({entry}) => {
	return (
			<span>{entry.bidder.firstName} bid {entry.bid} on {entry.slot}</span>
		)
}

export default ActivityEvent