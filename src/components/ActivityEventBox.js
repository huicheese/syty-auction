import React from 'react'
import ActivityEvent from './ActivityEvent'

const ActivityEventBox = ({activityEvents}) => {
	return (
			<div className="row activity-row">
			<ul className="activity">
				{
					activityEvents.map((entry, key) => 
						<ActivityEvent key={key} entry={entry}/>)
				}
			</ul>
			</div>
		)
}

export default ActivityEventBox
