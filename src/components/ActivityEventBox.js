import React from 'react'
import ActivityEvent from './ActivityEvent'

const ActivityEventBox = ({activityEvents}) => {
	return (
			<div className="row activity-row">
			<ul className="activity">
				{
					activityEvents.map((entry, key) => 
						entry && entry.bidder && <ActivityEvent key={entry.index} entry={entry}/>)
				}
			</ul>
			</div>
		)
}

export default ActivityEventBox
