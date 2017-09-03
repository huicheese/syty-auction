import React from 'react'

const Control = (props) => {

	const { onSystemPermissionClick } = props
	return (
			<div className="container">
				<button type="button" onClick={onSystemPermissionClick}>Toggle System Permission</button>
			</div>
		)
}

export default Control