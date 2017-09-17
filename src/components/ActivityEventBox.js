import React from 'react'
import ActivityEvent from './ActivityEvent'

const ActivityEventBox = ({activityEvents}) => {
	return (
 		<div className="header-row">
      <div className="header-row-icon"><span>SS</span>C</div>
        <div className="header-row-activity">
          <div className="activities">
            {
              activityEvents.map((entry, key) => 
                entry && entry.bidder && <ActivityEvent key={key} entry={entry}/>)
            }
          </div>
      	</div>
    	</div>
		)
}

export default ActivityEventBox
