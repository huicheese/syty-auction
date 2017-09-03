import React from 'react'
import ActivityEvent from './ActivityEvent'

const ActivityEventBox = ({activityEvents}) => {
	return (
 		<div className="header-row">
      <div className="header-row-icon"><span>CC</span>G</div>
      	<div className="header-row-activity">
					{
						activityEvents.map((entry, key) => 
							entry && entry.bidder && <ActivityEvent key={entry.index} entry={entry}/>)
					}
      	</div>
    	</div>
		)
}

export default ActivityEventBox
