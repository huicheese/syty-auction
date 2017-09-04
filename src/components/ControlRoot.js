import React from 'react'
import Promise from 'bluebird'

const Control = (props) => {

	const { users, onSystemPermissionClick, onUserPermissionClick, onRefreshUsersClick } = props
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
								<div className="slot-container" key={entry.user_id}>
									<div className="container">
										<pre>{ JSON.stringify(entry, null, 2) }</pre>
									</div>
									<button type="button" onClick={(e)=> onUserPermissionClick(entry.user_id)}>Toggle User Permission</button>
								</div>
							)
						}
					</div>
				</div>
			</div>
		)
}

export default Control