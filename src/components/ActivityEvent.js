import React from 'react'

const ActivityEvent = ({entry}) => {
	return (
			<li>{entry.bidder} bid {entry.bid} on {entry.slot}</li>
		)
}

export default ActivityEvent