import React from 'react'

const Control = (props) => {

	const { users, userBiddings, onSystemPermissionClick, onUserPermissionClick, onRefreshUsersClick, onRefreshUserBidsClick, onDeleteBidClick } = props
	return (
			<div className="container">
				<button className="row" type="button" onClick={onSystemPermissionClick}>Toggle System Permission</button>
				<br/>
				<button className="row" type="button" onClick={onRefreshUsersClick}>Refresh list of Users</button>
				<br/>
				<div className="c8 row">
					<div className="row slot-row">
						{
							users.map((entry, key) =>
								<div
									className="slot-container"
									key={entry.user_id}
									onClick={(e) => onRefreshUserBidsClick(entry.user_id)}
								>
									<div className="container">
										<pre>{ JSON.stringify(entry, null, 2) }</pre>
									</div>
									<button type="button" onClick={(e) => onUserPermissionClick(entry.user_id)}>Toggle User Permission</button>
								</div>
							)
						}
					</div>
				</div>
				<br/>
				<div className="slot-row">
					{
						userBiddings.map((entry, key) =>
							<div className="slot-container" key={entry.bid_id}>
								<div className="container">
									<pre>{ JSON.stringify(entry, null, 2) }</pre>
								</div>
								<button type="button" onClick={(e) => onDeleteBidClick(entry.bid_id, entry.slot, entry.user_id)}>Delete Bid</button>
							</div>
						)
					}
				</div>
			</div>
		)
}

export default Control