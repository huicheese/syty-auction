import React from 'react'

const SummaryReport = (props) => {

	const { slots } = props
	return (
			<div className="container">
				<div className="row slot row">
					Sum: 	{
								slots
									.map((entry, key) => Number.parseInt(entry.highestBid) || 0)
									.reduce((a,b) => a + b, 0)
							}
				</div>
				{
					slots.map((entry, key) =>
							<div className="row slot-row" key={entry.index}>
								Slot: { Number.parseInt(entry.index, 10) + 1 }
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