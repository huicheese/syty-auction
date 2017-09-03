import React from 'react'

const SummaryReport = (props) => {

	const { slots } = props
	return (
			<div className="container">
				{
					slots.map((entry, key) =>
							<div className="row slot-row" key={entry.index}>
								Slot: {entry.index}
								<br/>
								HighestBid: {entry.highestBid}
								<div className="container">
									<pre>{ JSON.stringify(entry.highestBidders, null, 2) }</pre>
								</div>
							</div>
						)
				}
			</div>
		)
}

export default SummaryReport